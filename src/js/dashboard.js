document.addEventListener('DOMContentLoaded', () => {
    // --- Key Constants from other modules ---
    const RISK_SCENARIOS_KEY = 'riskCalculatorScenarios';
    const ISMS_STATE_KEY = 'ismsManagementState';
    const TOTAL_ISO_CONTROLS = 93; // Based on the included ISO 27001:2022 library

    // Default risk thresholds from index.html, used as a fallback.
    const DEFAULT_THRESHOLDS = {
        medium: 10000,
        high: 50000,
        critical: 250000,
    };

    const currencyFormatter = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0, maximumFractionDigits: 0 });

    /**
     * Updates the "Key Risk Indicators" card on the dashboard.
     */
    function updateRiskSummary() {
        const scenariosData = localStorage.getItem(RISK_SCENARIOS_KEY);
        if (!scenariosData) {
            return; // No data, do nothing, placeholders will be shown.
        }

        const scenarios = JSON.parse(scenariosData);
        if (!scenarios || scenarios.length === 0) {
            return; // Empty array, do nothing.
        }

        let totalLikelyALE = 0;
        let criticalOrHighRiskCount = 0;

        scenarios.forEach(scenario => {
            const likelyLoss = parseFloat(scenario.likely_loss) || 0;
            const likelyFreq = parseFloat(scenario.likely_freq) || 0;
            const likelyALE = likelyLoss * likelyFreq;

            totalLikelyALE += likelyALE;

            if (likelyALE >= DEFAULT_THRESHOLDS.high) {
                criticalOrHighRiskCount++;
            }
        });

        // Update DOM elements
        const totalAleEl = document.getElementById('total-ale');
        const criticalRisksEl = document.getElementById('critical-risks-count');
        const totalRisksEl = document.getElementById('total-risks-count');

        if (totalAleEl) totalAleEl.textContent = currencyFormatter.format(totalLikelyALE);
        if (criticalRisksEl) criticalRisksEl.textContent = criticalOrHighRiskCount;
        if (totalRisksEl) totalRisksEl.textContent = scenarios.length;
    }

    /**
     * Updates the "ISMS Building Progress" card on the dashboard.
     */
    function updateIsmsSummary() {
        const ismsData = localStorage.getItem(ISMS_STATE_KEY);
        if (!ismsData) {
            return; // No data, do nothing.
        }

        const ismsState = JSON.parse(ismsData);
        if (!ismsState || !ismsState.soa) {
            return; // Malformed data.
        }

        const soa = ismsState.soa;
        let implementedCount = 0;

        Object.values(soa).forEach(controlState => {
            // A control is considered "implemented" for the dashboard if it has any maturity level
            // and is not marked as "Not Applicable".
            if (controlState.maturity > 0 && !controlState.notApplicable) {
                implementedCount++;
            }
        });

        const percentage = TOTAL_ISO_CONTROLS > 0 ? (implementedCount / TOTAL_ISO_CONTROLS) * 100 : 0;

        // Update DOM Elements
        const progressBarEl = document.getElementById('isms-progress-bar');
        const progressTextEl = document.getElementById('isms-progress-text');

        if (progressBarEl) {
            progressBarEl.style.width = `${percentage.toFixed(0)}%`;
            progressBarEl.textContent = `${percentage.toFixed(0)}%`;
        }
        if (progressTextEl) {
            progressTextEl.textContent = `${implementedCount} / ${TOTAL_ISO_CONTROLS} Controls`;
        }
    }

    // Initial population of the dashboard
    updateRiskSummary();
    updateIsmsSummary();
});
