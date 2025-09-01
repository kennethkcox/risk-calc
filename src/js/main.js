const addButton = document.getElementById('add-risk-btn');
const tableBody = document.getElementById('risk-table-body');
const errorMessage = document.getElementById('error-message');

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

let riskScenarios = [...exampleData];

function calculateRisk(data, thresholds) {
    const valueKeys = Object.keys(inputs).filter(k => k !== 'scenario');
    const allValues = valueKeys.map(key => data[key]);
    const parsedVals = allValues.map(v => parseFloat(v));

    if (parsedVals.some(isNaN)) {
        return null;
    }

    // Re-map parsedVals based on the new `inputs` object order for clarity
    const [confImpact, integImpact, availImpact, freqControls, cMit, iMit, aMit, minLoss, likelyLoss, maxLoss, minFreq, likelyFreq, maxFreq] = parsedVals;


    if (minLoss > likelyLoss || likelyLoss > maxLoss || minFreq > likelyFreq || likelyFreq > maxFreq) {
         showError("Min values cannot be greater than Likely or Max values.");
         return null;
    } else if (thresholds.medium >= thresholds.high || thresholds.high >= thresholds.critical) {
         showError("Risk level thresholds must be in increasing order.");
         return null;
    }
     hideError();

    const inherentSLE = (minLoss + 4 * likelyLoss + maxLoss) / 6;
    const inherentARO = (minFreq + 4 * likelyFreq + maxFreq) / 6;

    const totalCiaImpact = confImpact + integImpact + availImpact;
    let weightedMagControlEffectiveness = 3;
    if (totalCiaImpact > 0) {
         weightedMagControlEffectiveness = ((cMit * confImpact) + (iMit * integImpact) + (aMit * availImpact)) / totalCiaImpact;
    }

    const magnitudeControlModifier = (6 - weightedMagControlEffectiveness) / 5;
    const frequencyControlModifier = (6 - freqControls) / 5;

    const residualSLE = inherentSLE * magnitudeControlModifier;
    const residualARO = inherentARO * frequencyControlModifier;
    const finalALE = residualSLE * residualARO;

    let riskLevel, riskColorClass;
    if (finalALE >= thresholds.critical) {
        riskLevel = "Critical";
        riskColorClass = "bg-red-600 text-white";
    } else if (finalALE >= thresholds.high) {
        riskLevel = "High";
        riskColorClass = "bg-orange-500 text-white";
    } else if (finalALE >= thresholds.medium) {
        riskLevel = "Medium";
        riskColorClass = "bg-yellow-400 text-black";
    } else {
        riskLevel = "Low";
        riskColorClass = "bg-green-500 text-white";
    }

    return { ...data, residualSLE, residualARO, finalALE, riskLevel, riskColorClass };
}

const currencyFormatter = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0, maximumFractionDigits: 0 });

function renderRow(calculatedData) {
    const newRow = tableBody.insertRow();
    newRow.className = 'bg-white border-b';
    newRow.innerHTML = `
        <td class="px-4 py-3 font-medium text-gray-900">${escapeHTML(calculatedData.scenario)}</td>
        <td class="px-4 py-3 text-center font-mono">${currencyFormatter.format(calculatedData.residualSLE)}</td>
        <td class="px-4 py-3 text-center font-mono">${calculatedData.residualARO.toFixed(2)}</td>
        <td class="px-4 py-3 text-center font-mono">${currencyFormatter.format(calculatedData.finalALE)}</td>
        <td class="px-4 py-3 text-center font-bold ${calculatedData.riskColorClass}">${calculatedData.riskLevel}</td>
    `;
}

function updateLivePreview(thresholds) {
    const currentValues = {};
    for(const key in inputs) {
        currentValues[key] = inputs[key].value;
    }
    const calculatedData = calculateRisk(currentValues, thresholds);

    if (calculatedData) {
        previewElements.sle.textContent = currencyFormatter.format(calculatedData.residualSLE);
        previewElements.aro.textContent = calculatedData.residualARO.toFixed(2);
        previewElements.ale.textContent = currencyFormatter.format(calculatedData.finalALE);
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

function addRiskFromForm() {
    const currentValues = {};
    for(const key in inputs) {
        currentValues[key] = inputs[key].value;
    }
    if (!currentValues.scenario.trim()) {
         showError("Please enter a scenario description.");
         return;
    }

    riskScenarios.push(currentValues);
    renderApp();
    Object.values(inputs).forEach(input => { if(input.type !== 'button') input.value = ''; });
}

function renderApp() {
    const thresholds = {
        medium: parseFloat(thresholdInputs.medium.value) || 0,
        high: parseFloat(thresholdInputs.high.value) || 0,
        critical: parseFloat(thresholdInputs.critical.value) || 0,
    };

    updateRiskLevelSummary(thresholds);
    tableBody.innerHTML = ''; // Clear table

    let hasError = false;
    riskScenarios.forEach(data => {
        const calculated = calculateRisk(data, thresholds);
        if (calculated) {
            renderRow(calculated);
        } else {
            hasError = true;
        }
    });

    if(!hasError) hideError();

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

addButton.addEventListener('click', addRiskFromForm);
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

window.addEventListener('DOMContentLoaded', renderApp);
