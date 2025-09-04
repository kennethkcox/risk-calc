document.addEventListener('DOMContentLoaded', () => {
    const strideTab = document.getElementById('stride-tab');
    const dreadTab = document.getElementById('dread-tab');
    const threatContent = document.getElementById('threat-content');

    const renderThreats = (framework) => {
        threatContent.innerHTML = '';
        const threats = THREAT_FRAMEWORKS[framework];
        threats.forEach(threat => {
            const threatCard = document.createElement('div');
            threatCard.className = 'threat-card';
            threatCard.innerHTML = `
                <h3>${threat.name}</h3>
                <p>${threat.description}</p>
                <h4>Example</h4>
                <p>${threat.example}</p>
                <h4>Mitigation</h4>
                <p>${threat.mitigation}</p>
            `;
            threatContent.appendChild(threatCard);
        });
    };

    strideTab.addEventListener('click', () => {
        strideTab.classList.add('active');
        dreadTab.classList.remove('active');
        renderThreats('STRIDE');
    });

    dreadTab.addEventListener('click', () => {
        dreadTab.classList.add('active');
        strideTab.classList.remove('active');
        renderThreats('DREAD');
    });

    // Initial render
    renderThreats('STRIDE');
});
