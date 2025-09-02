// --- Monte Carlo Simulation Worker ---

importScripts('iso27001.js');

// This worker runs the CPU-intensive risk calculation in the background
// to avoid freezing the main UI thread.

self.onmessage = function(e) {
    const { scenarioData, thresholds, controlStates } = e.data;
    const result = calculateRisk(scenarioData, thresholds, controlStates);
    self.postMessage(result);
};

// --- Calculation Logic (copied and adapted from main.js) ---

function calculateRisk(data, thresholds, controlStates) {
    const NUM_TRIALS = 10000; // Increased for accuracy
    const PERT_GAMMA = 4;

    const valueKeys = [
        'conf_impact', 'integ_impact', 'avail_impact',
        'min_loss', 'likely_loss', 'max_loss',
        'min_freq', 'likely_freq', 'max_freq'
    ];
    const allValues = valueKeys.map(key => data[key]);
    const parsedVals = allValues.map(v => parseFloat(v));

    if (parsedVals.some(isNaN)) {
        return { ...data, error: "Invalid number format in inputs." };
    }

    const [confImpact, integImpact, availImpact, minLoss, likelyLoss, maxLoss, minFreq, likelyFreq, maxFreq] = parsedVals;

    if (minLoss > likelyLoss || likelyLoss > maxLoss || minFreq > likelyFreq || likelyFreq > maxFreq) {
        return { ...data, error: "Min values cannot be greater than Likely or Max." };
    }

    let magnitudeControlModifier = 1.0;
    let frequencyControlModifier = 1.0;

    if (data.applicableControls && data.applicableControls.length > 0) {
        data.applicableControls.forEach(controlId => {
            const control = ISO_27001_CONTROLS.find(c => c.id === controlId);
            const state = controlStates[controlId];

            if (control && state && state.implemented) {
                const modifier = 1 - (state.effectiveness / 100);
                if (control.impacts.includes('magnitude')) {
                    magnitudeControlModifier *= modifier;
                }
                if (control.impacts.includes('frequency')) {
                    frequencyControlModifier *= modifier;
                }
            }
        });
    }

    const getPertSample = (min, mostLikely, max) => {
        if (max === min) return min;
        const meanVal = (min + PERT_GAMMA * mostLikely + max) / (PERT_GAMMA + 2);
        const stdDev = (max - min) / (PERT_GAMMA + 2);
        let sample = meanVal + stdDev * random_normal();
        return Math.max(min, Math.min(sample, max));
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

    return { ...data, meanSLE, meanARO, meanALE, p90ALE, riskLevel, riskColorClass, rawAles: simulatedAles, error: null };
}

// --- Helper Functions ---

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
