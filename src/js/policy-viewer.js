document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('policies-container');
    const searchInput = document.getElementById('policy-search');

    if (!container || typeof policies === 'undefined') {
        container.innerHTML = '<div class="card"><div class="p-4 text-center"><p class="text-red-500">Error: Policies could not be loaded.</p></div></div>';
        return;
    }

    const renderPolicies = (policiesToRender) => {
        container.innerHTML = ''; // Clear existing content

        if (policiesToRender.length === 0) {
            container.innerHTML = '<div class="card"><div class="p-4 text-center"><p>No policies found.</p></div></div>';
            return;
        }

        const policiesByCategory = policiesToRender.reduce((acc, policy) => {
            const category = policy.category || 'Uncategorized';
            if (!acc[category]) {
                acc[category] = [];
            }
            acc[category].push(policy);
            return acc;
        }, {});

        const sortedCategories = Object.keys(policiesByCategory).sort();

        sortedCategories.forEach(category => {
            const categorySection = document.createElement('div');
            categorySection.className = 'card';

            const categoryHeader = document.createElement('div');
            categoryHeader.className = 'card-header';
            categoryHeader.innerHTML = `<h2>${category}</h2>`;
            categorySection.appendChild(categoryHeader);

            const policyGrid = document.createElement('div');
            policyGrid.className = 'grid gap-6 p-6 grid-auto-fit-250';

            policiesByCategory[category].forEach(policy => {
                const policyCard = document.createElement('div');
                policyCard.className = 'bg-gray-50 p-4 rounded-lg border border-gray-200 flex flex-col';

                const policyTitle = document.createElement('h3');
                policyTitle.className = 'font-bold text-lg mb-2';
                policyTitle.textContent = policy.title;
                policyCard.appendChild(policyTitle);

                const policyDescription = document.createElement('p');
                policyDescription.className = 'text-gray-600 text-sm';
                policyDescription.textContent = policy.description;
                policyCard.appendChild(policyDescription);

                policyGrid.appendChild(policyCard);
            });

            categorySection.appendChild(policyGrid);
            container.appendChild(categorySection);
        });
    };

    // Initial render
    renderPolicies(policies);

    // Search functionality
    searchInput.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase();
        const filteredPolicies = policies.filter(policy => {
            return policy.title.toLowerCase().includes(searchTerm) ||
                   policy.description.toLowerCase().includes(searchTerm);
        });
        renderPolicies(filteredPolicies);
    });
});
