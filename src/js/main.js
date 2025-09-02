const addButton = document.getElementById('add-risk-btn');
const cancelButton = document.getElementById('cancel-edit-btn');
const clearDataButton = document.getElementById('clear-data-btn');
const tableBody = document.getElementById('risk-table-body');
const errorMessage = document.getElementById('error-message');

const inputs = {
    scenario: document.getElementById('scenario'),
    conf_impact: document.getElementById('conf_impact'),
    integ_impact: document.getElementById('integ_impact'),
    avail_impact: document.getElementById('avail_impact'),
    min_loss: document.getElementById('min_loss'),
    likely_loss: document.getElementById('likely_loss'),
    max_loss: document.getElementById('max_loss'),
    min_freq: document.getElementById('min_freq'),
    likely_freq: document.getElementById('likely_freq'),
    max_freq: document.getElementById('max_freq'),
};

const thresholdInputs = {
    medium: document.getElementById('medium_threshold'),
    high: document.getElementById('high_threshold'),
    critical: document.getElementById('critical_threshold'),
};

const exampleData = [
    { scenario: 'Ransomware encrypts primary file server', conf_impact: "1", integ_impact: "2", avail_impact: "3", min_loss: "50000", likely_loss: "150000", max_loss: "500000", min_freq: "0.1", likely_freq: "0.5", max_freq: "1", applicableControls: ['A.8.7', 'A.8.13'] },
    { scenario: 'Successful phishing of finance executive', conf_impact: "3", integ_impact: "3", avail_impact: "1", min_loss: "25000", likely_loss: "75000", max_loss: "200000", min_freq: "0.5", likely_freq: "2", max_freq: "5", applicableControls: ['A.6.3', 'A.8.23'] },
];

let riskScenarios = [];
let editIndex = null;

function initializeScenarios() {
    const saved = localStorage.getItem('riskCalculatorScenarios');
    if (saved && saved !== '[]') {
        riskScenarios = JSON.parse(saved);
    } else {
        riskScenarios = [...exampleData];
    }
}

function saveRiskFromForm() {
    const currentValues = {};
    for (const key in inputs) {
        currentValues[key] = inputs[key].value;
    }
    if (!currentValues.scenario.trim()) {
        showError("Please enter a scenario description.");
        return;
    }

    const selectedControls = [];
    const controlCheckboxes = document.querySelectorAll('#applicable-controls-container input[type="checkbox"]:checked');
    controlCheckboxes.forEach(cb => selectedControls.push(cb.value));
    currentValues.applicableControls = selectedControls;

    if (editIndex !== null) {
        riskScenarios[editIndex] = currentValues;
    } else {
        riskScenarios.push(currentValues);
    }
    localStorage.setItem('riskCalculatorScenarios', JSON.stringify(riskScenarios));
    renderApp();
    resetForm();
}

function resetForm() {
    Object.values(inputs).forEach(input => { input.value = ''; });
    renderApplicableControls();
    editIndex = null;
    addButton.textContent = 'Add Risk Scenario';
    cancelButton.classList.add('hidden');
    hideError();
}

function loadScenarioForEdit(index) {
    const scenarioData = riskScenarios[index];
    if (!scenarioData) return;
    editIndex = index;
    for (const key in inputs) {
        if (inputs[key] && scenarioData[key] !== undefined) {
            inputs[key].value = scenarioData[key];
        }
    }
    renderApplicableControls(scenarioData.applicableControls || []);
    addButton.textContent = 'Update Scenario';
    cancelButton.classList.remove('hidden');
}

function calculateRisk(data) {
    const valueKeys = Object.keys(inputs);
    const parsedVals = valueKeys.map(key => parseFloat(data[key]));
    if (parsedVals.some(isNaN)) return null;

    const [confImpact, integImpact, availImpact, minLoss, likelyLoss, maxLoss, minFreq, likelyFreq, maxFreq] = parsedVals;
    if (minLoss > likelyLoss || likelyLoss > maxLoss || minFreq > likelyFreq || likelyFreq > maxFreq) {
        showError("Min values cannot be greater than Likely or Max values.");
        return null;
    }
    hideError();

    let combinedModifier = 1.0;
    if (data.applicableControls && data.applicableControls.length > 0) {
        const controlModifiers = data.applicableControls.map(id => {
            const state = getControlState(id);
            return state.implemented ? 1 - (state.effectiveness / 100) : 1;
        });
        if (controlModifiers.length > 0) {
            combinedModifier = controlModifiers.reduce((acc, val) => acc * val, 1.0);
        }
    }

    const magnitudeControlModifier = combinedModifier;
    const frequencyControlModifier = combinedModifier;

    const inherentSLE = (minLoss + 4 * likelyLoss + maxLoss) / 6;
    const inherentARO = (minFreq + 4 * likelyFreq + maxFreq) / 6;
    const residualSLE = inherentSLE * magnitudeControlModifier;
    const residualARO = inherentARO * frequencyControlModifier;
    const finalALE = residualSLE * residualARO;

    let riskLevel, riskColorClass;
    if (finalALE >= thresholdInputs.critical.value) {
        riskLevel = "Critical";
        riskColorClass = "bg-red-600 text-white";
    } else if (finalALE >= thresholdInputs.high.value) {
        riskLevel = "High";
        riskColorClass = "bg-orange-500 text-white";
    } else if (finalALE >= thresholdInputs.medium.value) {
        riskLevel = "Medium";
        riskColorClass = "bg-yellow-400 text-black";
    } else {
        riskLevel = "Low";
        riskColorClass = "bg-green-500 text-white";
    }

    return { ...data, residualSLE, residualARO, finalALE, riskLevel, riskColorClass };
}

const currencyFormatter = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0, maximumFractionDigits: 0 });

function renderRow(data, index) {
    const calculated = calculateRisk(data);
    if (!calculated) return;

    const newRow = tableBody.insertRow();
    newRow.className = 'bg-white border-b';
    newRow.innerHTML = `
        <td class="px-4 py-3 font-medium text-gray-900">${escapeHTML(calculated.scenario)}</td>
        <td class="px-4 py-3 text-center font-mono">${currencyFormatter.format(calculated.residualSLE)}</td>
        <td class="px-4 py-3 text-center font-mono">${calculated.residualARO.toFixed(2)}</td>
        <td class="px-4 py-3 text-center font-mono">${currencyFormatter.format(calculated.finalALE)}</td>
        <td class="px-4 py-3 text-center font-bold ${calculated.riskColorClass}">${calculated.riskLevel}</td>
        <td class="px-4 py-3 text-center">
            <button class="edit-btn text-blue-600 hover:underline mr-2" data-index="${index}">Edit</button>
        </td>
    `;
}

function renderApp() {
    tableBody.innerHTML = '';
    riskScenarios.forEach((data, index) => renderRow(data, index));
}

function showError(message) {
    errorMessage.textContent = message;
    errorMessage.classList.remove('hidden');
}

function hideError() {
     errorMessage.classList.add('hidden');
}

function escapeHTML(str) {
    const p = document.createElement('p');
    p.appendChild(document.createTextNode(str));
    return p.innerHTML;
}

function renderApplicableControls(selectedControlIds = []) {
    const container = document.getElementById('applicable-controls-container');
    const implementedControls = getImplementedControls();
    container.innerHTML = '';

    if (implementedControls.length === 0) {
        container.innerHTML = '<p class="text-gray-500 text-sm">No controls implemented yet. Go to the Control Library to add some.</p>';
        return;
    }

    implementedControls.forEach(controlId => {
        const control = ISO_27001_CONTROLS.find(c => c.id === controlId);
        if (!control) return;

        const wrapper = document.createElement('div');
        wrapper.className = 'flex items-center';
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.id = `applicable-${control.id}`;
        checkbox.value = control.id;
        checkbox.checked = selectedControlIds.includes(control.id);
        checkbox.className = 'h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-600';
        const label = document.createElement('label');
        label.htmlFor = `applicable-${control.id}`;
        label.className = 'ml-2 text-sm text-gray-600';
        label.textContent = control.id;
        wrapper.appendChild(checkbox);
        wrapper.appendChild(label);
        container.appendChild(wrapper);
    });
}

function renderControlLibrary() {
    const container = document.getElementById('control-library-container');
    container.innerHTML = '';
    const categoryScores = getCategoryScores();

    const controlsByCategory = ISO_27001_CONTROLS.reduce((acc, control) => {
        if (!acc[control.category]) acc[control.category] = [];
        acc[control.category].push(control);
        return acc;
    }, {});

    for (const category in controlsByCategory) {
        const fieldset = document.createElement('fieldset');
        fieldset.className = 'p-4 border rounded-lg';
        const legend = document.createElement('legend');
        legend.className = 'px-2 font-bold text-lg cursor-pointer flex justify-between items-center w-full';
        const leftSideOfLegend = document.createElement('div');
        leftSideOfLegend.className = 'flex items-center';
        const titleSpan = document.createElement('span');
        titleSpan.textContent = `${category} Controls`;
        const scoreSpan = document.createElement('span');
        scoreSpan.className = 'ml-4 text-sm font-normal bg-gray-200 text-gray-700 px-2 py-1 rounded-full';
        scoreSpan.id = `score-${category}`;
        scoreSpan.textContent = `${categoryScores[category]}%`;
        leftSideOfLegend.appendChild(titleSpan);
        leftSideOfLegend.appendChild(scoreSpan);
        const chevronSpan = document.createElement('span');
        chevronSpan.innerHTML = '&#9662;';
        chevronSpan.className = 'transition-transform duration-300';
        legend.appendChild(leftSideOfLegend);
        legend.appendChild(chevronSpan);
        fieldset.appendChild(legend);
        const grid = document.createElement('div');
        grid.className = 'control-grid hidden';
        legend.addEventListener('click', () => {
            grid.classList.toggle('hidden');
            chevronSpan.classList.toggle('-rotate-180');
        });
        controlsByCategory[category].forEach(control => {
            const state = getControlState(control.id);
            const controlWrapper = document.createElement('div');
            controlWrapper.className = 'flex items-center justify-between';
            const leftSide = document.createElement('div');
            leftSide.className = 'flex items-center';
            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.id = `control-${control.id}`;
            checkbox.checked = state.implemented;
            checkbox.className = 'h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-600';
            const label = document.createElement('label');
            label.htmlFor = `control-${control.id}`;
            label.className = 'ml-3 text-sm text-gray-700';
            label.innerHTML = `<span class="font-semibold">${control.id}</span>: ${control.name}`;
            leftSide.appendChild(checkbox);
            leftSide.appendChild(label);
            const rightSide = document.createElement('div');
            rightSide.className = 'flex items-center space-x-2';
            const slider = document.createElement('input');
            slider.type = 'range';
            slider.dataset.testid = `slider-${control.id}`;
            slider.min = 0;
            slider.max = 100;
            slider.step = 5;
            slider.value = state.effectiveness;
            slider.disabled = !state.implemented;
            slider.className = 'w-24 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer';
            const percentage = document.createElement('span');
            percentage.className = 'text-sm font-mono text-gray-600 w-12 text-right';
            percentage.textContent = `${state.effectiveness}%`;
            if (!state.implemented) {
                slider.classList.add('opacity-50');
                percentage.classList.add('opacity-50');
            }
            checkbox.addEventListener('change', (e) => {
                const implemented = e.target.checked;
                slider.disabled = !implemented;
                slider.classList.toggle('opacity-50', !implemented);
                percentage.classList.toggle('opacity-50', !implemented);
                updateControlState(control.id, implemented, parseInt(slider.value));
                const newScores = getCategoryScores();
                document.getElementById(`score-${control.category}`).textContent = `${newScores[control.category]}%`;
            });
            slider.addEventListener('input', (e) => {
                const effectiveness = parseInt(e.target.value);
                percentage.textContent = `${effectiveness}%`;
                updateControlState(control.id, checkbox.checked, effectiveness);
                const newScores = getCategoryScores();
                document.getElementById(`score-${control.category}`).textContent = `${newScores[control.category]}%`;
            });
            rightSide.appendChild(slider);
            rightSide.appendChild(percentage);
            controlWrapper.appendChild(leftSide);
            controlWrapper.appendChild(rightSide);
            grid.appendChild(controlWrapper);
        });
        fieldset.appendChild(grid);
        container.appendChild(fieldset);
    }
}

cancelButton.addEventListener('click', resetForm);
addButton.addEventListener('click', saveRiskFromForm);
clearDataButton.addEventListener('click', () => {
    if (confirm('Are you sure you want to clear all scenarios? This will remove any saved data.')) {
        localStorage.removeItem('riskCalculatorScenarios');
        riskScenarios = [];
        renderApp();
    }
});

tableBody.addEventListener('click', (event) => {
    if (event.target.classList.contains('edit-btn')) {
        const index = event.target.getAttribute('data-index');
        loadScenarioForEdit(parseInt(index, 10));
    }
});

window.addEventListener('DOMContentLoaded', () => {
    initializeControls();
    initializeScenarios();
    renderApp();
    renderControlLibrary();
});
