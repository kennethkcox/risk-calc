document.addEventListener('DOMContentLoaded', () => {
    const policiesYes = document.getElementById('policies-yes');
    const policiesNo = document.getElementById('policies-no');
    const policiesGuidance = document.getElementById('policies-guidance');

    const assessmentYes = document.getElementById('assessment-yes');
    const assessmentNo = document.getElementById('assessment-no');
    const assessmentGuidance = document.getElementById('assessment-guidance');

    policiesNo.addEventListener('click', () => {
        policiesGuidance.classList.remove('hidden');
    });

    policiesYes.addEventListener('click', () => {
        policiesGuidance.classList.add('hidden');
    });

    assessmentNo.addEventListener('click', () => {
        assessmentGuidance.classList.remove('hidden');
    });

    assessmentYes.addEventListener('click', () => {
        assessmentGuidance.classList.add('hidden');
    });
});
