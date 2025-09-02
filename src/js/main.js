const addButton = document.getElementById('add-risk-btn');
const cancelButton = document.getElementById('cancel-edit-btn');
const clearDataButton = document.getElementById('clear-data-btn');
const tableBody = document.getElementById('risk-table-body');
const errorMessage = document.getElementById('error-message');

const STORAGE_KEY = 'riskCalculatorScenarios';

const inputs = {
    scenario: document.getElementById('scenario'),
    conf_impact: document.getElementById('conf_impact'),
    integ_impact: document.getElementById('integ_impact'),
    avail_impact: document.getElementById('avail_impact'),
    freq_controls: document.getElementById('freq_controls'),
    c_mit: document.getElementById('c_mit'),
    i_mit: document.getElementById('i_mit'),
    a_mit: document.getElementById('a_mit'),
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
const chartContainer = document.getElementById('chart-container');
const detailsModal = document.getElementById('details-modal');
const modalCloseButton = document.getElementById('modal-close-btn');
const modalTitle = document.getElementById('modal-title');

function saveState() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(riskScenarios));
    updateClearButtonVisibility();
}

function initializeScenarios() {
    const savedScenarios = localStorage.getItem(STORAGE_KEY);
    if (savedScenarios) {
        riskScenarios = JSON.parse(savedScenarios);
    } else {
        riskScenarios = [...exampleData];
    }
    updateClearButtonVisibility();
}

function updateClearButtonVisibility() {
    const savedScenarios = localStorage.getItem(STORAGE_KEY);
    if (savedScenarios) {
        clearDataButton.classList.remove('hidden');
    } else {
        clearDataButton.classList.add('hidden');
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

    // Also update the live preview
    const thresholds = {
        medium: parseFloat(thresholdInputs.medium.value) || 0,
        high: parseFloat(thresholdInputs.high.value) || 0,
        critical: parseFloat(thresholdInputs.critical.value) || 0,
    };
    updateLivePreview(thresholds);
}

function calculateRisk(data, thresholds) {
    const NUM_TRIALS = 10000;
    const PERT_GAMMA = 4;

    const valueKeys = Object.keys(inputs).filter(k => k !== 'scenario');
    const allValues = valueKeys.map(key => data[key]);
    const parsedVals = allValues.map(v => parseFloat(v));

    if (parsedVals.some(isNaN)) {
        return null;
    }

    const [confImpact, integImpact, availImpact, freqControls, cMit, iMit, aMit, minLoss, likelyLoss, maxLoss, minFreq, likelyFreq, maxFreq] = parsedVals;

    if (minLoss > likelyLoss || likelyLoss > maxLoss || minFreq > likelyFreq || likelyFreq > maxFreq) {
        showError("Min values cannot be greater than Likely or Max values.");
        return null;
    } else if (thresholds.medium >= thresholds.high || thresholds.high >= thresholds.critical) {
        showError("Risk level thresholds must be in increasing order.");
        return null;
    }
    hideError();

    const totalCiaImpact = confImpact + integImpact + availImpact;
    let weightedMagControlEffectiveness = 3;
    if (totalCiaImpact > 0) {
        weightedMagControlEffectiveness = ((cMit * confImpact) + (iMit * integImpact) + (aMit * availImpact)) / totalCiaImpact;
    }

    const magnitudeControlModifier = (6 - weightedMagControlEffectiveness) / 5;
    const frequencyControlModifier = (6 - freqControls) / 5;

    // Helper for PERT sampling using Normal Approximation
    const getPertSample = (min, mostLikely, max) => {
        if (max === min) return min;
        const meanVal = (min + PERT_GAMMA * mostLikely + max) / (PERT_GAMMA + 2);
        const stdDev = (max - min) / (PERT_GAMMA + 2);
        let sample = meanVal + stdDev * random_normal();
        return Math.max(min, Math.min(sample, max)); // Clamp to bounds
    };

    const simulatedAles = [];
    const simulatedSles = [];
    const simulatedAros = [];

    for (let i = 0; i < NUM_TRIALS; i++) {
        const inherentSLE = getPertSample(minLoss, likelyLoss, maxLoss);
        const inherentARO = getPertSample(minFreq, likelyFreq, maxFreq);

        const residualSLE = inherentSLE * magnitudeControlModifier;
        const residualARO = inherentARO * frequencyControlModifier;
        const finalALE = residualSLE * residualARO;

        simulatedSles.push(residualSLE);
        simulatedAros.push(residualARO);
        simulatedAles.push(finalALE);
    }

    const meanALE = mean(simulatedAles);
    const p90ALE = quantile(simulatedAles, 0.9);
    const meanSLE = mean(simulatedSles);
    const meanARO = mean(simulatedAros);

    let riskLevel, riskColorClass;
    if (meanALE >= thresholds.critical) {
        riskLevel = "Critical";
        riskColorClass = "bg-red-600 text-white";
    } else if (meanALE >= thresholds.high) {
        riskLevel = "High";
        riskColorClass = "bg-orange-500 text-white";
    } else if (meanALE >= thresholds.medium) {
        riskLevel = "Medium";
        riskColorClass = "bg-yellow-400 text-black";
    } else {
        riskLevel = "Low";
        riskColorClass = "bg-green-500 text-white";
    }

    return { ...data, meanSLE, meanARO, meanALE, p90ALE, riskLevel, riskColorClass, rawAles: simulatedAles };
}

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
    const currentValues = {};
    for(const key in inputs) {
        currentValues[key] = inputs[key].value;
    }
    const calculatedData = calculateRisk(currentValues, thresholds);

    if (calculatedData) {
        previewElements.sle.textContent = currencyFormatter.format(calculatedData.meanSLE);
        previewElements.aro.textContent = calculatedData.meanARO.toFixed(2);
        previewElements.ale.textContent = currencyFormatter.format(calculatedData.meanALE);
        previewElements.level.textContent = calculatedData.riskLevel;
        previewElements.level.className = `mt-1 text-lg font-bold p-2 rounded-md ${calculatedData.riskColorClass}`;
    } else {
        previewElements.sle.textContent = '-';
        previewElements.aro.textContent = '-';
        previewElements.ale.textContent = '-';
        previewElements.level.textContent = '-';
        previewElements.level.className = 'mt-1 text-lg font-bold p-2 rounded-md bg-gray-200 text-gray-500';
    }
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

function resetForm() {
    Object.values(inputs).forEach(input => { if(input.type !== 'button') input.value = ''; });
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

function renderApp() {
    const thresholds = {
        medium: parseFloat(thresholdInputs.medium.value) || 0,
        high: parseFloat(thresholdInputs.high.value) || 0,
        critical: parseFloat(thresholdInputs.critical.value) || 0,
    };

    updateRiskLevelSummary(thresholds);
    tableBody.innerHTML = ''; // Clear table

    calculatedScenarios = []; // Reset the global array
    let hasError = false;
    riskScenarios.forEach((data, index) => {
        const calculated = calculateRisk(data, thresholds);
        if (calculated) {
            calculatedScenarios.push(calculated);
            renderRow(calculated, index);
        } else {
            hasError = true;
        }
    });

    if(!hasError) hideError();

    renderRiskChart(calculatedScenarios);
    updateLivePreview(thresholds);
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

function random_normal() {
    let u = 0, v = 0;
    while(u === 0) u = Math.random();
    while(v === 0) v = Math.random();
    return Math.sqrt( -2.0 * Math.log( u ) ) * Math.cos( 2.0 * Math.PI * v );
}

function mean(arr) {
    if (arr.length === 0) return 0;
    return arr.reduce((a, b) => a + b, 0) / arr.length;
}

function quantile(arr, q) {
    if (arr.length === 0) return 0;
    const sorted = arr.slice().sort((a, b) => a - b);
    const pos = (sorted.length - 1) * q;
    const base = Math.floor(pos);
    const rest = pos - base;
    if (sorted[base + 1] !== undefined) {
        return sorted[base] + rest * (sorted[base + 1] - sorted[base]);
    } else {
        return sorted[base];
    }
}

cancelButton.addEventListener('click', resetForm);
addButton.addEventListener('click', saveRiskFromForm);
modalCloseButton.addEventListener('click', closeDetailsModal);
clearDataButton.addEventListener('click', () => {
    if (confirm('Are you sure you want to clear all saved scenarios and reset to the examples?')) {
        localStorage.removeItem(STORAGE_KEY);
        initializeScenarios();
        renderApp();
    }
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

window.addEventListener('DOMContentLoaded', () => {
    initializeScenarios();
    renderApp();
});
