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

const previewElements = {
    sle: document.getElementById('sle-preview'),
    aro: document.getElementById('aro-preview'),
    ale: document.getElementById('ale-preview'),
    level: document.getElementById('level-preview'),
};

const exampleData = [
    { scenario: 'Ransomware encrypts primary file server', min_loss: 50000, likely_loss: 150000, max_loss: 500000, min_freq: 0.1, likely_freq: 0.5, max_freq: 1, freq_controls: 3, conf_impact: 1, integ_impact: 2, avail_impact: 3, c_mit: 5, i_mit: 3, a_mit: 2 },
    { scenario: 'Successful phishing of finance executive', min_loss: 25000, likely_loss: 75000, max_loss: 200000, min_freq: 0.5, likely_freq: 2, max_freq: 5, freq_controls: 2, conf_impact: 3, integ_impact: 3, avail_impact: 1, c_mit: 3, i_mit: 4, a_mit: 5 },
    { scenario: 'Cloud storage misconfiguration exposes PII', min_loss: 100000, likely_loss: 500000, max_loss: 2000000, min_freq: 0.05, likely_freq: 0.2, max_freq: 0.5, freq_controls: 4, conf_impact: 3, integ_impact: 1, avail_impact: 1, c_mit: 2, i_mit: 5, a_mit: 5 },
];

let riskScenarios = [];
let calculatedScenarios = [];
let editIndex = null;
let riskChart = null;
let histogramChart = null;
let livePreviewWorker = null;
const chartContainer = document.getElementById('chart-container');
const detailsModal = document.getElementById('details-modal');
const modalCloseButton = document.getElementById('modal-close-btn');
const modalTitle = document.getElementById('modal-title');

function saveState() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(riskScenarios));
}

function initializeLivePreviewWorker() {
    if (window.Worker) {
        // Only create one worker for the live preview for efficiency
        if (!livePreviewWorker) {
            livePreviewWorker = new Worker('src/js/risk-worker.js');
            livePreviewWorker.onmessage = function(e) {
                const calculatedData = e.data;
                if (calculatedData && !calculatedData.error) {
                    previewElements.sle.textContent = currencyFormatter.format(calculatedData.meanSLE);
                    previewElements.aro.textContent = calculatedData.meanARO.toFixed(2);
                    previewElements.ale.textContent = currencyFormatter.format(calculatedData.meanALE);
                    previewElements.level.textContent = calculatedData.riskLevel;
                    previewElements.level.className = `mt-1 text-lg font-bold p-2 rounded-md ${calculatedData.riskColorClass}`;
                } else {
                    // Handle potential error from worker if needed
                    previewElements.sle.textContent = '-';
                    previewElements.aro.textContent = '-';
                    previewElements.ale.textContent = '-';
                    previewElements.level.textContent = '-';
                    previewElements.level.className = 'mt-1 text-lg font-bold p-2 rounded-md bg-gray-200 text-gray-500';
                }
            }
        }
    }
}

function initializeScenarios() {
    const savedScenarios = localStorage.getItem(STORAGE_KEY);
    if (savedScenarios) {
        riskScenarios = JSON.parse(savedScenarios);
    } else {
        riskScenarios = [...exampleData];
    }
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

    // Also update the live preview
    const thresholds = {
        medium: parseFloat(thresholdInputs.medium.value) || 0,
        high: parseFloat(thresholdInputs.high.value) || 0,
        critical: parseFloat(thresholdInputs.critical.value) || 0,
    };
    updateLivePreview(thresholds);
}

// All calculation logic has been moved to src/js/risk-worker.js

const currencyFormatter = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0, maximumFractionDigits: 0 });

function renderRow(calculatedData, index) {
    const newRow = tableBody.insertRow();
    newRow.className = 'bg-white border-b';
    newRow.innerHTML = `
        <td class="px-4 py-3 font-medium text-gray-900">${escapeHTML(calculatedData.scenario)}</td>
        <td class="px-4 py-3 text-center font-mono">${currencyFormatter.format(calculatedData.meanSLE)}</td>
        <td class="px-4 py-3 text-center font-mono">${calculatedData.meanARO.toFixed(2)}</td>
        <td class="px-4 py-3 text-center font-mono">${currencyFormatter.format(calculatedData.meanALE)}</td>
        <td class="px-4 py-3 text-center font-mono">${currencyFormatter.format(calculatedData.p90ALE)}</td>
        <td class="px-4 py-3 text-center font-bold ${calculatedData.riskColorClass}">${calculatedData.riskLevel}</td>
        <td class="px-4 py-3 text-center">
            <button class="edit-btn text-blue-600 hover:underline mr-2" data-index="${index}">Edit</button>
            <button class="details-btn text-green-600 hover:underline" data-index="${index}">Details</button>
        </td>
    `;
}

function renderRiskChart(calculatedScenarios) {
    const riskChartCanvas = document.getElementById('risk-chart');
    const chartPlaceholder = document.getElementById('chart-placeholder');

    if (calculatedScenarios.length === 0) {
        riskChartCanvas.classList.add('hidden');
        chartPlaceholder.classList.remove('hidden');
        if(riskChart) {
            riskChart.destroy();
            riskChart = null;
        }
        return;
    }
    riskChartCanvas.classList.remove('hidden');
    chartPlaceholder.classList.add('hidden');

    const ctx = riskChartCanvas.getContext('2d');
    const labels = calculatedScenarios.map(s => s.scenario);
    const data = calculatedScenarios.map(s => s.meanALE);
    const backgroundColors = calculatedScenarios.map(s => {
        if (s.riskLevel === 'Critical') return 'rgba(220, 38, 38, 0.7)';
        if (s.riskLevel === 'High') return 'rgba(249, 115, 22, 0.7)';
        if (s.riskLevel === 'Medium') return 'rgba(250, 204, 21, 0.7)';
        return 'rgba(34, 197, 94, 0.7)';
    });

    if (riskChart) {
        riskChart.destroy();
    }

    riskChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: 'Annualized Loss Expectancy (ALE)',
                data: data,
                backgroundColor: backgroundColors,
                borderColor: backgroundColors.map(c => c.replace('0.7', '1')),
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            indexAxis: 'y',
            scales: {
                x: {
                    beginAtZero: true,
                    ticks: {
                        callback: function(value, index, values) {
                            return currencyFormatter.format(value);
                        }
                    }
                }
            },
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            let label = context.dataset.label || '';
                            if (label) {
                                label += ': ';
                            }
                            if (context.parsed.x !== null) {
                                label += currencyFormatter.format(context.parsed.x);
                            }
                            return label;
                        }
                    }
                }
            }
        }
    });
}

function updateLivePreview(thresholds) {
    if (!livePreviewWorker) {
        console.error("Live preview worker not initialized.");
        return;
    }

    const currentValues = {};
    for (const key in inputs) {
        currentValues[key] = inputs[key].value;
    }
    // Get applicable controls from the form
    const selectedControls = [];
    const controlCheckboxes = document.querySelectorAll('#applicable-controls-container input[type="checkbox"]:checked');
    controlCheckboxes.forEach(cb => selectedControls.push(cb.value));
    currentValues.applicableControls = selectedControls;

    // Show loading state
    previewElements.sle.textContent = '...';
    previewElements.aro.textContent = '...';
    previewElements.ale.textContent = '...';
    previewElements.level.textContent = '...';
    previewElements.level.className = 'mt-1 text-lg font-bold p-2 rounded-md bg-gray-200 text-gray-500';

    livePreviewWorker.postMessage({
        scenarioData: currentValues,
        thresholds: thresholds,
        controlStates: getControlStates() // Send a snapshot of all control states
    });
}

function updateRiskLevelSummary(thresholds) {
    const summaryEl = document.getElementById('risk-level-summary');
    summaryEl.innerHTML = `
        <span class="text-green-600">Low: &lt; ${currencyFormatter.format(thresholds.medium)}</span>
        <span class="text-yellow-600">Medium: &lt; ${currencyFormatter.format(thresholds.high)}</span>
        <span class="text-orange-600">High: &lt; ${currencyFormatter.format(thresholds.critical)}</span>
        <span class="text-red-600">Critical: &ge; ${currencyFormatter.format(thresholds.critical)}</span>
    `;
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

function resetForm() {
    Object.values(inputs).forEach(input => { if(input.type !== 'button') input.value = ''; });
    renderApplicableControls(); // Clear and render the controls list
    editIndex = null;
    addButton.textContent = 'Add Risk Scenario';
    cancelButton.classList.add('hidden');
    hideError();
    // Also update the live preview
    const thresholds = {
        medium: parseFloat(thresholdInputs.medium.value) || 0,
        high: parseFloat(thresholdInputs.high.value) || 0,
        critical: parseFloat(thresholdInputs.critical.value) || 0,
    };
    updateLivePreview(thresholds);
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

    if (editIndex !== null) {
        // Update existing scenario
        riskScenarios[editIndex] = currentValues;
    } else {
        // Add new scenario
        riskScenarios.push(currentValues);
    }

saveState();
    renderApp();
    resetForm();
}

function getSuggestedControls(scenario) {
    const suggestions = new Set();
    const scenarioText = scenario.scenario.toLowerCase();
    const confImpact = parseInt(scenario.conf_impact, 10) || 0;
    const integImpact = parseInt(scenario.integ_impact, 10) || 0;
    const availImpact = parseInt(scenario.avail_impact, 10) || 0;
    const likelyFreq = parseFloat(scenario.likely_freq) || 0;

    // Suggest based on impact
    ISO_27001_CONTROLS.forEach(control => {
        // If any C, I, or A impact is high, suggest controls that reduce magnitude
        if ((confImpact > 1 || integImpact > 1 || availImpact > 1) && control.impacts.includes('magnitude')) {
            suggestions.add(control.id);
        }

        // Suggest frequency-related controls only if the event is somewhat likely
        if (likelyFreq > 0.5 && control.impacts.includes('frequency')) {
            suggestions.add(control.id);
        }

        // Suggest based on keywords in the scenario description
        const keywords = ['phishing', 'malware', 'ransomware', 'unauthorized', 'misconfiguration', 'disruption', 'leakage', 'theft', 'legal', 'privacy', 'pii'];
        keywords.forEach(keyword => {
            if (scenarioText.includes(keyword) && control.description.toLowerCase().includes(keyword)) {
                suggestions.add(control.id);
            }
        });
    });

    return Array.from(suggestions);
}

async function renderApp() {
    const thresholds = {
        medium: parseFloat(thresholdInputs.medium.value) || 0,
        high: parseFloat(thresholdInputs.high.value) || 0,
        critical: parseFloat(thresholdInputs.critical.value) || 0,
    };

    updateRiskLevelSummary(thresholds);
    tableBody.innerHTML = `<tr><td colspan="7" class="text-center p-8 text-gray-500">
        <div class="flex justify-center items-center space-x-2">
            <svg class="animate-spin h-5 w-5 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <span>Running simulations... This may take a moment.</span>
        </div>
    </td></tr>`;

    calculatedScenarios = []; // Reset the global array
    const allControlStates = getControlStates();

    const calculationPromises = riskScenarios.map(scenarioData => {
        return new Promise((resolve, reject) => {
            if (!window.Worker) {
                // Fallback for very old browsers, though not the primary target
                // This would require bringing calculateRisk back for a non-worker path
                console.error("Web Workers are not supported in this browser.");
                reject(new Error("Web Workers not supported."));
                return;
            }
            const worker = new Worker('src/js/risk-worker.js');
            worker.onmessage = e => {
                worker.terminate();
                resolve(e.data);
            };
            worker.onerror = e => {
                worker.terminate();
                reject(new Error(`Worker error: ${e.message}`));
            };
            worker.postMessage({
                scenarioData: scenarioData,
                thresholds: thresholds,
                controlStates: allControlStates
            });
        });
    });

    try {
        const results = await Promise.all(calculationPromises);
        tableBody.innerHTML = ''; // Clear loading message
        let hasError = false;

        results.forEach((calculated, index) => {
            if (calculated && !calculated.error) {
                calculatedScenarios.push(calculated);
                renderRow(calculated, index);
            } else {
                hasError = true;
                const originalScenario = riskScenarios[index];
                showError(`Error calculating scenario: "${originalScenario.scenario}". ${calculated.error || ''}`);
            }
        });

        if (!hasError) hideError();

    } catch (error) {
        console.error("An error occurred during risk calculation:", error);
        showError("A critical error occurred. Please check the console or refresh the page.");
        tableBody.innerHTML = `<tr><td colspan="7" class="text-center p-8 text-red-500">Calculation failed. Please refresh.</td></tr>`;
    } finally {
        renderRiskChart(calculatedScenarios);
        updateLivePreview(thresholds);
    }
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

function openDetailsModal(index) {
    const scenario = calculatedScenarios[index];
    if (!scenario) return;

    detailsModal.classList.remove('hidden');
    modalTitle.textContent = `ALE Distribution: ${escapeHTML(scenario.scenario)}`;

    renderHistogram(scenario.rawAles);
}

function closeDetailsModal() {
    detailsModal.classList.add('hidden');
    if (histogramChart) {
        histogramChart.destroy();
        histogramChart = null;
    }
}

function renderHistogram(ales) {
    const ctx = document.getElementById('histogram-chart').getContext('2d');

    // Simple binning logic
    const min = Math.min(...ales);
    const max = Math.max(...ales);
    const numBins = 30;
    const binWidth = (max - min) / numBins;
    const bins = Array(numBins).fill(0);
    const labels = [];

    for (let i = 0; i < numBins; i++) {
        const binStart = min + i * binWidth;
        const binEnd = binStart + binWidth;
        labels.push(`${currencyFormatter.format(binStart)}`);
    }

    ales.forEach(ale => {
        if (ale < min || ale > max) return; // Should not happen
        let binIndex = Math.floor((ale - min) / binWidth);
        if (binIndex === numBins) binIndex--; // Put max value in last bin
        bins[binIndex]++;
    });

    if (histogramChart) {
        histogramChart.destroy();
    }

    histogramChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: 'Frequency',
                data: bins,
                backgroundColor: 'rgba(54, 162, 235, 0.7)',
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 1,
                barPercentage: 1,
                categoryPercentage: 1,
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true,
                    title: { display: true, text: 'Number of Simulated Years (Frequency)' }
                },
                x: {
                    title: { display: true, text: 'Annualized Loss Expectancy (ALE) Bins' }
                }
            },
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                     callbacks: {
                        title: function(context) {
                            const index = context[0].dataIndex;
                            const binStart = min + index * binWidth;
                            const binEnd = binStart + binWidth;
                             return `ALE: ${currencyFormatter.format(binStart)} - ${currencyFormatter.format(binEnd)}`;
                        },
                        label: function(context) {
                            return `Frequency: ${context.parsed.y}`;
                        }
                    }
                }
            }
        }
    });
}

// Helper functions (mean, quantile, random_normal) are now in the worker.

function exportData() {
    const data = {
        scenarios: riskScenarios,
        controls: getControlStates(),
        thresholds: {
            medium: thresholdInputs.medium.value,
            high: thresholdInputs.high.value,
            critical: thresholdInputs.critical.value,
        }
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
            if (!data.scenarios || !data.controls || !data.thresholds) {
                throw new Error("Invalid or corrupted JSON file format.");
            }

            // Load data
            riskScenarios = data.scenarios;
            saveControlStates(data.controls); // Need to create this function in controls.js
            thresholdInputs.medium.value = data.thresholds.medium;
            thresholdInputs.high.value = data.thresholds.high;
            thresholdInputs.critical.value = data.thresholds.critical;

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
modalCloseButton.addEventListener('click', closeDetailsModal);

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
    }
    if (event.target.classList.contains('details-btn')) {
        const index = event.target.getAttribute('data-index');
        openDetailsModal(parseInt(index, 10));
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

window.addEventListener('DOMContentLoaded', () => {
    // Setup collapsible control library first, as it's independent of data loading.
    const controlLibraryHeader = document.getElementById('control-library-header');
    const controlLibraryContent = document.getElementById('control-library-content');
    const controlLibraryToggleIcon = document.getElementById('control-library-toggle-icon');

    if (controlLibraryContent && controlLibraryToggleIcon && controlLibraryHeader) {
        console.log("All elements found, setting up toggle.");
        // Start with the library closed by default.
        controlLibraryHeader.addEventListener('click', () => {
            controlLibraryContent.classList.toggle('open');
            controlLibraryToggleIcon.classList.toggle('open');
        });
    } else {
        console.error("Could not find one or more control library elements.");
    }

    initializeScenarios();
    initializeControls();
    initializeLivePreviewWorker();
    renderApp();
    renderControlLibrary();
});
