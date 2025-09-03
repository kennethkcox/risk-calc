document.addEventListener('DOMContentLoaded', () => {
    const appContainer = document.getElementById('isms-app');

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
        // Ensure all controls have a default entry in the state
        ISO_27001_CONTROLS.forEach(control => {
            if (!ismsState.soa[control.id]) {
                ismsState.soa[control.id] = {
                    status: 'Not Set',
                    justification: ''
                };
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

    function renderSoA() {
        const soaSection = document.createElement('div');
        soaSection.className = 'card';

        // Header for the SoA section
        const header = document.createElement('div');
        header.className = 'card-header';
        header.innerHTML = `<h2>Statement of Applicability (SoA)</h2>`;
        soaSection.appendChild(header);

        const content = document.createElement('div');
        content.className = 'p-4';

        // Group controls by category
        const controlsByCategory = ISO_27001_CONTROLS.reduce((acc, control) => {
            if (!acc[control.category]) {
                acc[control.category] = [];
            }
            acc[control.category].push(control);
            return acc;
        }, {});

        // Render controls for each category
        for (const category in controlsByCategory) {
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
                        <th style="width: 20%;">Implementation Status</th>
                        <th style="width: 40%;">Justification / Notes</th>
                    </tr>
                </thead>
            `;

            const tbody = document.createElement('tbody');
            controlsByCategory[category].forEach(control => {
                const controlState = ismsState.soa[control.id] || { status: 'Not Set', justification: '' };
                const row = tbody.insertRow();
                row.innerHTML = `
                    <td class="px-4 py-3">
                        <span class="font-semibold">${control.id}</span>: ${control.name}
                        <p class="text-xs text-gray-500 mt-1">${control.description}</p>
                    </td>
                    <td class="px-4 py-3">
                        <select class="table-cell-input soa-status" data-control-id="${control.id}">
                            <option value="Not Set" ${controlState.status === 'Not Set' ? 'selected' : ''}>Not Set</option>
                            <option value="Implemented" ${controlState.status === 'Implemented' ? 'selected' : ''}>Implemented</option>
                            <option value="Not Applicable" ${controlState.status === 'Not Applicable' ? 'selected' : ''}>Not Applicable</option>
                        </select>
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

        // Add event listeners for the inputs
        soaSection.addEventListener('change', (e) => {
            if (e.target.classList.contains('soa-status')) {
                const controlId = e.target.dataset.controlId;
                ismsState.soa[controlId].status = e.target.value;
                saveState();
            }
        });

        soaSection.addEventListener('input', (e) => {
            if (e.target.classList.contains('soa-justification')) {
                const controlId = e.target.dataset.controlId;
                ismsState.soa[controlId].justification = e.target.value;
                saveState();
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

        // Form for adding a new log entry
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

        // Table of existing log entries
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

        auditLogSection.appendChild(content);

        // Event Listeners
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

                ismsState.auditLog.unshift({ date, controlId, finding, status, id: Date.now() }); // Add to beginning
                saveState();
                render(); // Re-render the whole app
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
        // Clear the container
        appContainer.innerHTML = '';

        // Render all components
        appContainer.appendChild(renderSoA());
        appContainer.appendChild(renderAuditLog());
    }

    // --- Theme Switcher Logic (borrowed from main.js) ---
    const themeSwitcherContainer = document.getElementById('theme-switcher-container');
    const THEME_STORAGE_KEY = 'riskCalculatorTheme'; // Use the same key to keep theme consistent

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

    const savedTheme = localStorage.getItem(THEME_STORAGE_KEY);
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const initialTheme = savedTheme || (systemPrefersDark ? 'dark' : 'light');

    applyTheme(initialTheme);
    createThemeSwitcher(initialTheme);
    // --- End of Theme Switcher Logic ---

    // Initial load
    loadState();
    render();
});
