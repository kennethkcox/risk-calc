const addButton = document.getElementById('add-risk-btn');
const cancelButton = document.getElementById('cancel-edit-btn');
const clearDataButton = document.getElementById('clear-data-btn');
const suggestButton = document.getElementById('suggest-controls-btn');
const tableBody = document.getElementById('risk-table-body');
const errorMessage = document.getElementById('error-message');

const STORAGE_KEY = 'riskCalculatorScenarios';

const inputs = {
    scenario: document.getElementById('scenario'),
    internet_exposure: document.getElementById('internet_exposure'),
    conf_impact: document.getElementById('conf_impact'),
    integ_impact: document.getElementById('integ_impact'),
    avail_impact: document.getElementById('avail_impact'),
    likelihood: document.getElementById('likelihood'),
    impact: document.getElementById('impact'),
};

// Thresholds are now based on a simple risk score (Likelihood * Impact)
const riskScoreThresholds = {
    medium: 4,   // Score of 4-7 is Medium
    high: 8,     // Score of 8-11 is High
    critical: 12 // Score of 12+ is Critical
};

const previewElements = {
    level: document.getElementById('level-preview'),
};

const exampleData = [
    { scenario: 'Ransomware encrypts primary file server', likelihood: "3", impact: "4", internet_exposure: "High", conf_impact: "2", integ_impact: "3", avail_impact: "3", applicableControls: ["A.5.10", "A.5.14"], applicableThreats: ["T0859"] },
    { scenario: 'Successful phishing of finance executive', likelihood: "4", impact: "3", internet_exposure: "Limited", conf_impact: "3", integ_impact: "3", avail_impact: "1", applicableControls: ["A.8.2", "A.8.3"], applicableThreats: ["T0861"] },
    { scenario: 'Cloud storage misconfiguration exposes PII', likelihood: "2", impact: "4", internet_exposure: "High", conf_impact: "3", integ_impact: "1", avail_impact: "2", applicableControls: ["A.7.7", "A.8.28"], applicableThreats: ["T0885"] },
];

let riskScenarios = [];
let calculatedScenarios = [];
let editIndex = null;
let riskChart = null;
const chartContainer = document.getElementById('chart-container');

function saveState() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(riskScenarios));
}

function initializeScenarios() {
    const savedScenarios = localStorage.getItem(STORAGE_KEY);
    riskScenarios = savedScenarios ? JSON.parse(savedScenarios) : [...exampleData];
}

function loadScenarioForEdit(index) {
    const scenarioData = riskScenarios[index];
    if (!scenarioData) return;

    editIndex = index;

    for (const key in inputs) {
        if(inputs[key] && scenarioData[key] !== undefined) {
            inputs[key].value = scenarioData[key];
        }
    }

    addButton.textContent = 'Update Scenario';
    cancelButton.classList.remove('hidden');
    renderApplicableControls(scenarioData.applicableControls || []);
    renderApplicableThreats(scenarioData.applicableThreats || []);
    updateLivePreview();
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

function renderApplicableThreats(selectedThreatIds = []) {
    const container = document.getElementById('applicable-threats-container');
    container.innerHTML = '';

    const allThreats = Object.values(THREAT_FRAMEWORKS).flat();

    if (allThreats.length === 0) {
        container.innerHTML = '<p class="text-gray-500 text-sm">No threats found in the library.</p>';
        return;
    }

    allThreats.forEach(threat => {
        const wrapper = document.createElement('div');
        wrapper.className = 'flex items-center';

        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.id = `applicable-${threat.id}`;
        checkbox.value = threat.id;
        checkbox.checked = selectedThreatIds.includes(threat.id);
        checkbox.className = 'h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-600';

        const label = document.createElement('label');
        label.htmlFor = `applicable-${threat.id}`;
        label.className = 'ml-2 text-sm text-gray-600';
        label.textContent = `${threat.id}: ${threat.name}`;

        wrapper.appendChild(checkbox);
        wrapper.appendChild(label);
        container.appendChild(wrapper);
    });
}

function resetForm() {
    // Clear all text inputs
    inputs.scenario.value = '';

    // Set dropdowns to default 'Medium'
    inputs.likelihood.value = "2";
    inputs.impact.value = "2";
    inputs.internet_exposure.value = "Limited";
    inputs.conf_impact.value = "1";
    inputs.integ_impact.value = "1";
    inputs.avail_impact.value = "1";

    renderApplicableControls();
    renderApplicableThreats();
    editIndex = null;
    addButton.textContent = 'Add Risk Scenario';
    cancelButton.classList.add('hidden');
    hideError();
    updateLivePreview();
}

function saveRiskFromForm() {
    const currentValues = {};
    for(const key in inputs) {
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

    const selectedThreats = [];
    const threatCheckboxes = document.querySelectorAll('#applicable-threats-container input[type="checkbox"]:checked');
    threatCheckboxes.forEach(cb => selectedThreats.push(cb.value));
    currentValues.applicableThreats = selectedThreats;

    if (editIndex !== null) {
        riskScenarios[editIndex] = currentValues;
    } else {
        riskScenarios.push(currentValues);
    }

    saveState();
    renderApp();
    resetForm();
}

function calculateRisk(scenario) {
    const likelihood = parseInt(scenario.likelihood, 10) || 1;
    const impact = parseInt(scenario.impact, 10) || 1;

    // Reduce likelihood based on control effectiveness
    const implementedControls = getControlStates();
    const applicableControls = scenario.applicableControls || [];
    let controlEffectiveness = 0;
    if (applicableControls.length > 0) {
        let totalEffectiveness = 0;
        applicableControls.forEach(controlId => {
            const controlState = implementedControls[controlId];
            if (controlState && controlState.implemented) {
                totalEffectiveness += controlState.effectiveness;
            }
        });
        controlEffectiveness = totalEffectiveness / applicableControls.length;
    }

    // Reduce likelihood by a factor of control effectiveness. 100% effectiveness reduces likelihood by 50% (factor of 0.5)
    const likelihoodModifier = 1 - (controlEffectiveness / 200);
    const modifiedLikelihood = likelihood * likelihoodModifier;

    const riskScore = modifiedLikelihood * impact;

    let riskLevel = 'Low';
    let riskColorClass = 'risk-level-low';

    if (riskScore >= riskScoreThresholds.critical) {
        riskLevel = 'Critical';
        riskColorClass = 'risk-level-critical';
    } else if (riskScore >= riskScoreThresholds.high) {
        riskLevel = 'High';
        riskColorClass = 'risk-level-high';
    } else if (riskScore >= riskScoreThresholds.medium) {
        riskLevel = 'Medium';
        riskColorClass = 'risk-level-medium';
    }

    return { ...scenario, likelihood, impact, riskScore, riskLevel, riskColorClass };
}

function updateLivePreview() {
    const scenario = {};
    for (const key in inputs) {
        scenario[key] = inputs[key].value;
    }
    const calculated = calculateRisk(scenario);
    previewElements.level.textContent = calculated.riskLevel;
    previewElements.level.className = `mt-1 text-lg font-bold p-2 rounded-md ${calculated.riskColorClass}`;
}

function renderRow(calculatedData, originalIndex) {
    const newRow = tableBody.insertRow();
    newRow.className = 'bg-white border-b';

    const likelihoodMap = { 1: 'Low', 2: 'Medium', 3: 'High', 4: 'Very High' };
    const impactMap = { 1: 'Low', 2: 'Medium', 3: 'High', 4: 'Very High' };

    newRow.innerHTML = `
        <td class="px-4 py-3 font-medium text-gray-900">${escapeHTML(calculatedData.scenario)}</td>
        <td class="px-4 py-3 text-center">${likelihoodMap[calculatedData.likelihood] || '-'}</td>
        <td class="px-4 py-3 text-center">${impactMap[calculatedData.impact] || '-'}</td>
        <td class="px-4 py-3 text-center font-bold ${calculatedData.riskColorClass}">${calculatedData.riskLevel}</td>
        <td class="px-4 py-3 text-center">
            <button class="clone-btn text-purple-600 hover:underline mr-2" data-index="${originalIndex}">Clone</button>
            <button class="edit-btn text-blue-600 hover:underline mr-2" data-index="${originalIndex}">Edit</button>
        </td>
    `;
}

function getChartJsThemeOptions() {
    const isDarkMode = document.documentElement.dataset.theme === 'dark';
    const gridColor = isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)';
    const textColor = isDarkMode ? '#f3f4f6' : '#1f2937';

    return {
        scales: {
            x: { ticks: { color: textColor }, grid: { color: gridColor }, title: { color: textColor } },
            y: { ticks: { color: textColor }, grid: { color: gridColor }, title: { color: textColor } }
        },
        plugins: {
            legend: { labels: { color: textColor } },
            tooltip: { titleColor: textColor, bodyColor: textColor, backgroundColor: isDarkMode ? '#1f2937' : '#ffffff', borderColor: gridColor }
        }
    };
}

function renderRiskChart(calculatedScenarios) {
    const riskChartCanvas = document.getElementById('risk-chart');
    const chartPlaceholder = document.getElementById('chart-placeholder');
    const tablePlaceholder = document.getElementById('table-placeholder');
    const loadExamplesButton = document.getElementById('load-examples-btn');

    if (calculatedScenarios.length === 0) {
        riskChartCanvas.classList.add('hidden');
        chartPlaceholder.classList.remove('hidden');
        tablePlaceholder.classList.remove('hidden');
        loadExamplesButton.classList.remove('hidden');
        if (riskChart) {
            riskChart.destroy();
            riskChart = null;
        }
        return;
    }
    tablePlaceholder.classList.add('hidden');
    loadExamplesButton.classList.add('hidden');
    riskChartCanvas.classList.remove('hidden');
    chartPlaceholder.classList.add('hidden');

    const ctx = riskChartCanvas.getContext('2d');
    const labels = calculatedScenarios.map(s => s.scenario);
    const data = calculatedScenarios.map(s => s.riskScore);
    const backgroundColors = calculatedScenarios.map(s => {
        if (s.riskLevel === 'Critical') return 'rgba(153, 27, 27, 0.7)'; // red-800
        if (s.riskLevel === 'High') return 'rgba(239, 68, 68, 0.7)'; // red-500
        if (s.riskLevel === 'Medium') return 'rgba(249, 115, 22, 0.7)'; // orange-500
        return 'rgba(34, 197, 94, 0.7)'; // green-500
    });

    if (riskChart) {
        riskChart.destroy();
    }

    const themeOptions = getChartJsThemeOptions();
    const chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        indexAxis: 'y',
        scales: {
            x: { beginAtZero: true, max: 16, grid: themeOptions.scales.x.grid, ticks: themeOptions.scales.x.ticks },
            y: { grid: themeOptions.scales.y.grid, ticks: themeOptions.scales.y.ticks }
        },
        plugins: {
            legend: { display: false },
            tooltip: {
                ...themeOptions.plugins.tooltip,
                callbacks: {
                    label: function(context) {
                        return `Risk Score: ${context.parsed.x.toFixed(2)}`;
                    }
                }
            }
        }
    };

    riskChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: 'Risk Score',
                data: data,
                backgroundColor: backgroundColors,
                borderColor: backgroundColors.map(c => c.replace('0.7', '1')),
                borderWidth: 1
            }]
        },
        options: chartOptions
    });
}

function renderApp() {
    tableBody.innerHTML = '';

    // First, map scenarios to calculated risks, preserving the original index
    calculatedScenarios = riskScenarios.map((scenario, index) => {
        const calculated = calculateRisk(scenario);
        calculated.originalIndex = index; // Attach the original index
        return calculated;
    });

    // Sort by risk score, highest first
    calculatedScenarios.sort((a, b) => b.riskScore - a.riskScore);

    const tablePlaceholder = document.getElementById('table-placeholder');
    if (riskScenarios.length === 0) {
        tablePlaceholder.classList.remove('hidden');
    } else {
        tablePlaceholder.classList.add('hidden');
    }

    // Now render using the preserved original index
    calculatedScenarios.forEach(calculated => {
        renderRow(calculated, calculated.originalIndex);
    });

    renderRiskChart(calculatedScenarios);
    updateLivePreview();
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

function exportData() {
    const data = {
        scenarios: riskScenarios,
        controls: getControlStates(),
    };
    const json = JSON.stringify(data, null, 2);
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    const date = new Date().toISOString().slice(0, 10);
    a.download = `risk-analysis-${date}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}

function importData(event) {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function(e) {
        try {
            const data = JSON.parse(e.target.result);
            if (!data.scenarios || !data.controls) {
                throw new Error("Invalid or corrupted JSON file format.");
            }

            // Load data
            riskScenarios = data.scenarios;
            saveControlStates(data.controls); // Need to create this function in controls.js

            // Save and re-render
            saveState();
            initializeControls(); // Re-init controls from the new state
            renderApp();
            renderControlLibrary();
            showError("Data imported successfully."); // Use error message for feedback
        } catch (error) {
            console.error("Import failed:", error);
            showError(`Import failed: ${error.message}`);
        } finally {
            // Reset file input so the same file can be loaded again
            event.target.value = '';
        }
    };
    reader.readAsText(file);
}


cancelButton.addEventListener('click', resetForm);
addButton.addEventListener('click', saveRiskFromForm);

document.getElementById('export-btn').addEventListener('click', exportData);
document.getElementById('import-btn').addEventListener('click', () => document.getElementById('import-file-input').click());
document.getElementById('import-file-input').addEventListener('change', importData);

const searchInput = document.getElementById('control-search-input');
const categoryFilter = document.getElementById('control-category-filter');

function handleControlFilterChange() {
    const searchTerm = searchInput.value.toLowerCase();
    const category = categoryFilter.value;
    renderControlLibrary(searchTerm, category);
}

searchInput.addEventListener('input', handleControlFilterChange);
categoryFilter.addEventListener('change', handleControlFilterChange);

function renderThreatLibrary(searchTerm = '', frameworkFilter = 'STRIDE') {
    const container = document.getElementById('threat-library-container');
    container.innerHTML = ''; // Clear existing content

    const threats = THREAT_FRAMEWORKS[frameworkFilter] || [];

    const filteredThreats = threats.filter(threat => {
        const matchesSearch = !searchTerm ||
            threat.id.toLowerCase().includes(searchTerm) ||
            threat.name.toLowerCase().includes(searchTerm) ||
            threat.description.toLowerCase().includes(searchTerm);
        return matchesSearch;
    });

    if (filteredThreats.length === 0) {
        container.innerHTML = '<p class="text-center text-gray-500">No threats match the current filters.</p>';
        return;
    }

    const grid = document.createElement('div');
    grid.className = 'control-grid'; // Re-using class for layout

    filteredThreats.forEach(threat => {
        const threatWrapper = document.createElement('div');
        threatWrapper.className = 'p-2 border-b';

        const nameEl = document.createElement('p');
        nameEl.innerHTML = `<span class="font-semibold">${threat.id}</span>: ${threat.name}`;

        const descEl = document.createElement('p');
        descEl.className = 'text-sm text-gray-600 ml-7';
        descEl.textContent = threat.description;

        threatWrapper.appendChild(nameEl);
        threatWrapper.appendChild(descEl);
        grid.appendChild(threatWrapper);
    });

    container.appendChild(grid);
}

const threatSearchInput = document.getElementById('threat-search-input');
const threatFrameworkFilter = document.getElementById('threat-framework-filter');

function handleThreatFilterChange() {
    const searchTerm = threatSearchInput.value.toLowerCase();
    const framework = threatFrameworkFilter.value;
    renderThreatLibrary(searchTerm, framework);
}

threatSearchInput.addEventListener('input', handleThreatFilterChange);
threatFrameworkFilter.addEventListener('change', handleThreatFilterChange);

suggestButton.addEventListener('click', () => {
    const currentValues = {};
    for(const key in inputs) {
        currentValues[key] = inputs[key].value;
    }

    if (!currentValues.scenario.trim()) {
        showError("Please enter a scenario description to get suggestions.");
        return;
    }
    hideError();

    const suggestedIds = getSuggestedControls(currentValues);
    const controlCheckboxes = document.querySelectorAll('#applicable-controls-container input[type="checkbox"]');

    controlCheckboxes.forEach(checkbox => {
        if (suggestedIds.includes(checkbox.value)) {
            checkbox.checked = true;
        }
    });
});
const confirmModal = document.getElementById('confirm-modal');
const confirmActionButton = document.getElementById('confirm-action-btn');
const confirmCancelButton = document.getElementById('confirm-cancel-btn');
let confirmCallback = null;

function showConfirmModal(callback, title = "Are you sure?", body = "This action cannot be undone.") {
    document.getElementById('confirm-modal-title').textContent = title;
    document.getElementById('confirm-modal-body').textContent = body;
    confirmCallback = callback;
    confirmModal.classList.remove('hidden');
}

function hideConfirmModal() {
    confirmModal.classList.add('hidden');
    confirmCallback = null;
}

confirmActionButton.addEventListener('click', () => {
    if (typeof confirmCallback === 'function') {
        confirmCallback();
    }
    hideConfirmModal();
});

confirmCancelButton.addEventListener('click', hideConfirmModal);

clearDataButton.addEventListener('click', () => {
    showConfirmModal(() => {
        localStorage.removeItem(STORAGE_KEY);
        localStorage.removeItem(CONTROLS_STORAGE_KEY); // Also clear controls
        riskScenarios = []; // Clear the array
        initializeControls(); // Reset controls to default
        renderApp();
        renderControlLibrary();
    }, 'Clear All Data?', 'Are you sure you want to clear all scenarios and control settings? This will remove all saved data.');
});

Object.values(inputs).forEach(input => {
    input.addEventListener('input', () => {
         const thresholds = {
            medium: parseFloat(thresholdInputs.medium.value) || 0,
            high: parseFloat(thresholdInputs.high.value) || 0,
            critical: parseFloat(thresholdInputs.critical.value) || 0,
        };
        updateLivePreview(thresholds);
    });
});
Object.values(thresholdInputs).forEach(input => {
    input.addEventListener('input', renderApp);
});

tableBody.addEventListener('click', (event) => {
    if (event.target.classList.contains('edit-btn')) {
        const index = event.target.getAttribute('data-index');
        loadScenarioForEdit(parseInt(index, 10));
        return; // Stop further processing
    }
    if (event.target.classList.contains('details-btn')) {
        const index = event.target.getAttribute('data-index');
        openDetailsModal(parseInt(index, 10));
        return; // Stop further processing
    }
    if (event.target.classList.contains('clone-btn')) {
        const index = parseInt(event.target.getAttribute('data-index'), 10);
        const scenarioToClone = riskScenarios[index];
        if (scenarioToClone) {
            // Create a deep copy
            const clonedScenario = JSON.parse(JSON.stringify(scenarioToClone));
            clonedScenario.scenario = `${clonedScenario.scenario} (copy)`;

            // Add the cloned scenario right after the original one
            riskScenarios.splice(index + 1, 0, clonedScenario);

            saveState();
            renderApp();
        }
    }
});

function renderControlLibrary(searchTerm = '', categoryFilter = '') {
    const container = document.getElementById('control-library-container');
    container.innerHTML = ''; // Clear existing content

    const filteredControls = ISO_27001_CONTROLS.filter(control => {
        const matchesCategory = !categoryFilter || control.category === categoryFilter;
        const matchesSearch = !searchTerm ||
            control.id.toLowerCase().includes(searchTerm) ||
            control.name.toLowerCase().includes(searchTerm) ||
            control.description.toLowerCase().includes(searchTerm);
        return matchesCategory && matchesSearch;
    });

    if (filteredControls.length === 0) {
        container.innerHTML = '<p class="text-center text-gray-500">No controls match the current filters.</p>';
        return;
    }

    const controlsByCategory = filteredControls.reduce((acc, control) => {
        if (!acc[control.category]) {
            acc[control.category] = [];
        }
        acc[control.category].push(control);
        return acc;
    }, {});

    for (const category in controlsByCategory) {
        const fieldset = document.createElement('fieldset');
        fieldset.className = 'p-4 border rounded-lg';

        const legend = document.createElement('legend');
        legend.className = 'px-2 font-bold text-lg';
        legend.textContent = `${category} Controls`;
        fieldset.appendChild(legend);

        const grid = document.createElement('div');
        grid.className = 'control-grid';

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
                if (!implemented) {
                    slider.classList.add('opacity-50');
                    percentage.classList.add('opacity-50');
                } else {
                    slider.classList.remove('opacity-50');
                    percentage.classList.remove('opacity-50');
                }
                updateControlState(control.id, implemented, parseInt(slider.value));
                renderApp();
                // We also need to refresh the list of applicable controls in the form
                const selectedControls = (editIndex !== null && riskScenarios[editIndex].applicableControls)
                    ? riskScenarios[editIndex].applicableControls
                    : [];
                renderApplicableControls(selectedControls);
            });

            slider.addEventListener('input', (e) => {
                const effectiveness = parseInt(e.target.value);
                percentage.textContent = `${effectiveness}%`;
                updateControlState(control.id, checkbox.checked, effectiveness);
                renderApp();
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
function setupCollapsible(headerId, contentId, iconId) {
    const header = document.getElementById(headerId);
    const content = document.getElementById(contentId);
    const icon = document.getElementById(iconId);

    if (header && content && icon) {
        // Check if content is already open from a previous session
        const isOpen = localStorage.getItem(contentId) === 'true';
        if (isOpen) {
            content.style.display = 'block';
            icon.classList.add('rotate-180');
        } else {
            content.style.display = 'none';
        }

        header.addEventListener('click', () => {
            const isCurrentlyOpen = content.style.display === 'block';
            content.style.display = isCurrentlyOpen ? 'none' : 'block';
            icon.classList.toggle('rotate-180', !isCurrentlyOpen);
            localStorage.setItem(contentId, !isCurrentlyOpen);
        });
    }
}

function openSectionByDefault(contentId, iconId) {
    const content = document.getElementById(contentId);
    const icon = document.getElementById(iconId);

    if (content && icon) {
        content.style.display = 'block';
        icon.classList.add('rotate-180');
        localStorage.setItem(contentId, 'true');
    }
}


window.addEventListener('DOMContentLoaded', () => {
    // Setup all collapsible sections
    setupCollapsible('guide-header', 'guide-content', 'guide-toggle-icon');
    setupCollapsible('control-library-header', 'control-library-content', 'control-library-toggle-icon');
    setupCollapsible('threat-library-header', 'threat-library-content', 'threat-library-toggle-icon');
    setupCollapsible('input-form-header', 'input-form-content', 'input-form-toggle-icon');
    setupCollapsible('risk-chart-header', 'risk-chart-content', 'risk-chart-toggle-icon');
    setupCollapsible('risk-table-header', 'risk-table-content', 'risk-table-toggle-icon');

    // Open the "Add New Risk Scenario" section by default only on first visit
    if (localStorage.getItem('input-form-content') === null) {
        openSectionByDefault('input-form-content', 'input-form-toggle-icon');
    }

    initializeScenarios();
    initializeControls(); // From controls.js
    renderApp();
    renderControlLibrary(); // From controls.js
    renderThreatLibrary(); // From threats.js
    renderApplicableThreats();
});
