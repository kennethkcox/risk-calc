const CONTROLS_STORAGE_KEY = 'riskCalculatorControls';

// This will be populated from localStorage or with defaults.
let controlState = {};

// This function initializes the control state from localStorage or sets defaults.
// It relies on ISO_27001_CONTROLS being globally available.
function initializeControls() {
    const savedState = localStorage.getItem(CONTROLS_STORAGE_KEY);
    if (savedState) {
        controlState = JSON.parse(savedState);
    } else {
        // Default to all controls being not implemented and 0% effective
        ISO_27001_CONTROLS.forEach(control => {
            controlState[control.id] = { implemented: false, effectiveness: 50 }; // Default to 50% if implemented
        });
    }
}

function saveControlState() {
    localStorage.setItem(CONTROLS_STORAGE_KEY, JSON.stringify(controlState));
}

function getControlState(controlId) {
    return controlState[controlId] || { implemented: false, effectiveness: 50 };
}

function updateControlState(controlId, implemented, effectiveness) {
    if (controlState[controlId]) {
        controlState[controlId].implemented = implemented;
        controlState[controlId].effectiveness = effectiveness;
        saveControlState();
    }
}

function getImplementedControls() {
    return Object.keys(controlState).filter(id => controlState[id].implemented);
}
