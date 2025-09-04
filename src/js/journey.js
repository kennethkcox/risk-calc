document.addEventListener('DOMContentLoaded', () => {
    const steps = {
        step1: document.getElementById('step1-policies'),
        step1b: document.getElementById('step1b-policy-suggestion'),
        step2: document.getElementById('step2-assessment'),
        step2b: document.getElementById('step2b-assessment-suggestion'),
        step3: document.getElementById('step3-risk-register'),
        step3b: document.getElementById('step3b-risk-register-suggestion'),
        end: document.getElementById('journey-end')
    };

    const buttons = {
        step1Yes: document.getElementById('step1-yes'),
        step1No: document.getElementById('step1-no'),
        step1bContinue: document.getElementById('step1b-continue'),
        step2Yes: document.getElementById('step2-yes'),
        step2No: document.getElementById('step2-no'),
        step2bContinue: document.getElementById('step2b-continue'),
        step3Yes: document.getElementById('step3-yes'),
        step3No: document.getElementById('step3-no'),
        step3bContinue: document.getElementById('step3b-continue'),
    };

    buttons.step1Yes.addEventListener('click', () => {
        steps.step1.classList.add('hidden');
        steps.step2.classList.remove('hidden');
    });

    buttons.step1No.addEventListener('click', () => {
        steps.step1.classList.add('hidden');
        steps.step1b.classList.remove('hidden');
    });

    buttons.step1bContinue.addEventListener('click', () => {
        steps.step1b.classList.add('hidden');
        steps.step2.classList.remove('hidden');
    });

    buttons.step2Yes.addEventListener('click', () => {
        steps.step2.classList.add('hidden');
        steps.step3.classList.remove('hidden');
    });

    buttons.step2No.addEventListener('click', () => {
        steps.step2.classList.add('hidden');
        steps.step2b.classList.remove('hidden');
    });

    buttons.step2bContinue.addEventListener('click', () => {
        steps.step2b.classList.add('hidden');
        steps.step3.classList.remove('hidden');
    });

    buttons.step3Yes.addEventListener('click', () => {
        steps.step3.classList.add('hidden');
        steps.end.classList.remove('hidden');
    });

    buttons.step3No.addEventListener('click', () => {
        steps.step3.classList.add('hidden');
        steps.step3b.classList.remove('hidden');
    });

    buttons.step3bContinue.addEventListener('click', () => {
        steps.step3b.classList.add('hidden');
        steps.end.classList.remove('hidden');
    });
});
