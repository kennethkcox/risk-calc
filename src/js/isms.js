document.addEventListener('DOMContentLoaded', () => {
    const appContainer = document.getElementById('isms-app');
    const ciaFilterContainer = document.getElementById('cia-filter');

    // State will be loaded from localStorage
    let ismsState = {};

    function loadState() {
        const savedState = localStorage.getItem('ismsManagementState');
        if (savedState) {
            ismsState = JSON.parse(savedState);
        } else {
            // Initialize with default structure if nothing is saved
            ismsState = {
                soa: {}, // Statement of Applicability
                auditLog: []
            };
        }

        // Ensure all controls have a default entry in the state and migrate old data structure
        ISO_27001_CONTROLS.forEach(control => {
            const controlState = ismsState.soa[control.id];

            // If a control from the list is missing from the state, initialize it
            if (!controlState) {
                ismsState.soa[control.id] = {
                    maturity: 0,
                    notApplicable: false,
                    justification: ''
                };
            }
            // If the control is in an old format (with `status`), migrate it
            else if (controlState.hasOwnProperty('status')) {
                const oldStatus = controlState.status;
                ismsState.soa[control.id].notApplicable = oldStatus === 'Not Applicable';
                ismsState.soa[control.id].maturity = oldStatus === 'Implemented' ? 5 : 0;
                // remove old property
                delete ismsState.soa[control.id].status;
            }
            // Ensure new properties exist if state is partially updated
            if (typeof ismsState.soa[control.id].maturity === 'undefined') {
                ismsState.soa[control.id].maturity = 0;
            }
            if (typeof ismsState.soa[control.id].notApplicable === 'undefined') {
                ismsState.soa[control.id].notApplicable = false;
            }
        });

        // Ensure audit log exists
        if (!ismsState.auditLog) {
            ismsState.auditLog = [];
        }
    }

    function saveState() {
        localStorage.setItem('ismsManagementState', JSON.stringify(ismsState));
    }

    function getFilteredControls() {
        const filterValue = document.querySelector('input[name="cia-score"]:checked')?.value || '1';
        const minScore = parseInt(filterValue, 10);
        // Return all controls if the filter is set to 1 (or is invalid)
        if (isNaN(minScore) || minScore <= 1) {
            return ISO_27001_CONTROLS;
        }
        return ISO_27001_CONTROLS.filter(control => control.ciaScore >= minScore);
    }

    function calculateMaturityScores() {
        const scores = {
            categories: {},
            overall: 0
        };

        const filteredControls = getFilteredControls();
        const controlsByCategory = filteredControls.reduce((acc, control) => {
            if (!acc[control.category]) {
                acc[control.category] = [];
            }
            acc[control.category].push(control);
            return acc;
        }, {});

        let totalMaturity = 0;
        let applicableControlsCount = 0;

        for (const category in controlsByCategory) {
            let categoryMaturity = 0;
            let categoryApplicableControlsCount = 0;

            controlsByCategory[category].forEach(control => {
                const controlState = ismsState.soa[control.id];
                if (controlState && !controlState.notApplicable) {
                    categoryMaturity += controlState.maturity;
                    categoryApplicableControlsCount++;
                }
            });

            if (categoryApplicableControlsCount > 0) {
                scores.categories[category] = (categoryMaturity / categoryApplicableControlsCount).toFixed(2);
            } else {
                scores.categories[category] = 'N/A';
            }

            totalMaturity += categoryMaturity;
            applicableControlsCount += categoryApplicableControlsCount;
        }

        if (applicableControlsCount > 0) {
            scores.overall = (totalMaturity / applicableControlsCount).toFixed(2);
        } else {
            scores.overall = 'N/A';
        }

        return scores;
    }

    function renderMaturityScores() {
        const scores = calculateMaturityScores();
        const container = document.getElementById('maturity-scores');
        if (!container) return;

        let categoryScoresHTML = '';
        const sortedCategories = Object.keys(scores.categories).sort();

        for (const category of sortedCategories) {
            categoryScoresHTML += `<div class="maturity-score-item"><span class="font-semibold">${category}:</span> ${scores.categories[category]}</div>`;
        }

        container.innerHTML = `
            <div class="maturity-scores-summary p-4 border rounded-lg mb-6">
                <h3 class="font-bold text-lg mb-2">Maturity Levels</h3>
                <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                    <div class="maturity-score-item overall-maturity"><span class="font-semibold">Overall:</span> ${scores.overall}</div>
                    ${categoryScoresHTML}
                </div>
            </div>
        `;
    }

    function renderSoA() {
        const soaSection = document.createElement('div');
        soaSection.className = 'card';

        const header = document.createElement('div');
        header.className = 'card-header';
        header.innerHTML = `<h2>Statement of Applicability (SoA)</h2>`;
        soaSection.appendChild(header);

        const content = document.createElement('div');
        content.className = 'p-4';

        const maturityScoresContainer = document.createElement('div');
        maturityScoresContainer.id = 'maturity-scores';
        content.appendChild(maturityScoresContainer);

        const filteredControls = getFilteredControls();
        const controlsByCategory = filteredControls.reduce((acc, control) => {
            if (!acc[control.category]) {
                acc[control.category] = [];
            }
            acc[control.category].push(control);
            return acc;
        }, {});

        const sortedCategories = Object.keys(controlsByCategory).sort();

        for (const category of sortedCategories) {
            if (controlsByCategory[category].length === 0) {
                continue; // Don't render empty categories
            }

            const fieldset = document.createElement('fieldset');
            fieldset.className = 'p-4 border rounded-lg mb-6';

            const legend = document.createElement('legend');
            legend.className = 'px-2 font-bold text-lg';
            legend.textContent = `${category} Controls`;
            fieldset.appendChild(legend);

            const tableContainer = document.createElement('div');
            tableContainer.className = 'table-container';
            const table = document.createElement('table');
            table.className = 'styled-table';
            table.innerHTML = `
                <thead>
                    <tr>
                        <th style="width: 40%;">Control</th>
                        <th style="width: 25%;">Maturity</th>
                        <th style="width: 35%;">Justification / Notes</th>
                    </tr>
                </thead>
            `;

            const tbody = document.createElement('tbody');
            controlsByCategory[category].forEach(control => {
                const controlState = ismsState.soa[control.id];
                const row = tbody.insertRow();
                const disabled = controlState.notApplicable ? 'disabled' : '';
                row.innerHTML = `
                    <td class="px-4 py-3">
                        <span class="font-semibold">${control.id}</span>: ${control.name}
                        <p class="text-xs text-gray-500 mt-1">${control.description}</p>
                    </td>
                    <td class="px-4 py-3">
                        <div class="flex items-center space-x-2">
                            <input type="range" min="0" max="5" value="${controlState.maturity}" class="soa-maturity w-full" data-control-id="${control.id}" ${disabled}>
                            <span class="soa-maturity-value font-bold w-4 text-center">${controlState.maturity}</span>
                        </div>
                        <div class="mt-2">
                            <label class="flex items-center text-xs">
                                <input type="checkbox" class="soa-na mr-2" data-control-id="${control.id}" ${controlState.notApplicable ? 'checked' : ''}>
                                Not Applicable
                            </label>
                        </div>
                    </td>
                    <td class="px-4 py-3">
                        <input type="text" class="table-cell-input soa-justification" data-control-id="${control.id}" value="${controlState.justification}" placeholder="e.g., Implemented via Policy XYZ">
                    </td>
                `;
            });
            table.appendChild(tbody);
            tableContainer.appendChild(table);
            fieldset.appendChild(tableContainer);
            content.appendChild(fieldset);
        }

        soaSection.appendChild(content);

        soaSection.addEventListener('input', (e) => {
            const controlId = e.target.dataset.controlId;
            if (!controlId) return;

            if (e.target.classList.contains('soa-maturity')) {
                const maturity = parseInt(e.target.value, 10);
                ismsState.soa[controlId].maturity = maturity;
                const valueSpan = e.target.nextElementSibling;
                if (valueSpan && valueSpan.classList.contains('soa-maturity-value')) {
                    valueSpan.textContent = maturity;
                }
                saveState();
                renderMaturityScores();
            } else if (e.target.classList.contains('soa-justification')) {
                ismsState.soa[controlId].justification = e.target.value;
                saveState();
            }
        });

        soaSection.addEventListener('change', (e) => {
            const controlId = e.target.dataset.controlId;
            if (!controlId) return;

            if (e.target.classList.contains('soa-na')) {
                ismsState.soa[controlId].notApplicable = e.target.checked;
                saveState();
                render();
            }
        });

        return soaSection;
    }

    function renderAuditLog() {
        const auditLogSection = document.createElement('div');
        auditLogSection.className = 'card';

        const header = document.createElement('div');
        header.className = 'card-header';
        header.innerHTML = `<h2>Audit Log</h2>`;
        auditLogSection.appendChild(header);

        const content = document.createElement('div');
        content.className = 'p-4';

        const form = document.createElement('div');
        form.className = 'p-4 border rounded-lg mb-6';
        const controlOptions = ISO_27001_CONTROLS.map(c => `<option value="${c.id}">${c.id}: ${c.name}</option>`).join('');
        form.innerHTML = `
            <h3 class="font-bold mb-4">Add New Log Entry</h3>
            <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
                <input type="date" id="audit-date" class="table-cell-input">
                <select id="audit-control-id" class="table-cell-input">${controlOptions}</select>
                <select id="audit-status" class="table-cell-input">
                    <option value="Open">Open</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Closed">Closed</option>
                </select>
                <textarea id="audit-finding" class="table-cell-input col-span-1 md:col-span-4" placeholder="Enter finding or observation..."></textarea>
                <button id="add-audit-log-btn" class="btn btn-primary md:col-start-4">Add Entry</button>
            </div>
        `;
        content.appendChild(form);

        const tableContainer = document.createElement('div');
        tableContainer.className = 'table-container';
        const table = document.createElement('table');
        table.className = 'styled-table';
        table.innerHTML = `
            <thead>
                <tr>
                    <th style="width: 15%;">Date</th>
                    <th style="width: 20%;">Control</th>
                    <th style="width: 45%;">Finding</th>
                    <th style="width: 15%;">Status</th>
                    <th style="width: 5%;">Actions</th>
                </tr>
            </thead>
        `;
        const tbody = document.createElement('tbody');
        ismsState.auditLog.forEach((entry, index) => {
            const row = tbody.insertRow();
            row.innerHTML = `
                <td class="px-4 py-3">${entry.date}</td>
                <td class="px-4 py-3">${entry.controlId}</td>
                <td class="px-4 py-3">${entry.finding}</td>
                <td class="px-4 py-3">${entry.status}</td>
                <td class="px-4 py-3 text-center">
                    <button class="delete-log-btn text-red-500 hover:underline" data-index="${index}">&times;</button>
                </td>
            `;
        });
        table.appendChild(tbody);
        tableContainer.appendChild(table);
        content.appendChild(tableContainer);

        auditLogSection.addEventListener('click', (e) => {
            if (e.target.id === 'add-audit-log-btn') {
                const date = document.getElementById('audit-date').value || new Date().toISOString().split('T')[0];
                const controlId = document.getElementById('audit-control-id').value;
                const finding = document.getElementById('audit-finding').value.trim();
                const status = document.getElementById('audit-status').value;

                if (!finding) {
                    alert('Please enter a finding.');
                    return;
                }

                ismsState.auditLog.unshift({ date, controlId, finding, status, id: Date.now() });
                saveState();
                render();
            }

            if (e.target.classList.contains('delete-log-btn')) {
                const index = parseInt(e.target.dataset.index, 10);
                if (confirm('Are you sure you want to delete this log entry?')) {
                    ismsState.auditLog.splice(index, 1);
                    saveState();
                    render();
                }
            }
        });

        return auditLogSection;
    }

    function render() {
        appContainer.innerHTML = '';
        appContainer.appendChild(renderSoA());
        appContainer.appendChild(renderAuditLog());
        renderMaturityScores();
    }

    const themeSwitcherContainer = document.getElementById('theme-switcher-container');
    const THEME_STORAGE_KEY = 'riskCalculatorTheme';

    function applyTheme(theme) {
        if (theme === 'dark') {
            document.documentElement.setAttribute('data-theme', 'dark');
        } else {
            document.documentElement.removeAttribute('data-theme');
        }
    }

    function createThemeSwitcher(currentTheme) {
        if (!themeSwitcherContainer) return;
        const label = document.createElement('label');
        label.htmlFor = 'theme-toggle-checkbox';
        label.className = 'theme-toggle';
        label.setAttribute('title', 'Toggle dark mode');

        const input = document.createElement('input');
        input.type = 'checkbox';
        input.id = 'theme-toggle-checkbox';
        input.className = 'hidden';
        input.checked = currentTheme === 'dark';

        const indicator = document.createElement('div');
        indicator.className = 'theme-toggle-indicator';

        label.appendChild(input);
        label.appendChild(indicator);

        input.addEventListener('change', () => {
            const newTheme = input.checked ? 'dark' : 'light';
            localStorage.setItem(THEME_STORAGE_KEY, newTheme);
            applyTheme(newTheme);
        });

        themeSwitcherContainer.appendChild(label);
    }

    if (ciaFilterContainer) {
        ciaFilterContainer.addEventListener('change', (e) => {
            if (e.target.name === 'cia-score') {
                render();
            }
        });
    }

    const savedTheme = localStorage.getItem(THEME_STORAGE_KEY);
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const initialTheme = savedTheme || (systemPrefersDark ? 'dark' : 'light');

    applyTheme(initialTheme);
    createThemeSwitcher(initialTheme);

    loadState();
    render();
});
