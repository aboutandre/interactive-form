const nameField = document.getElementById('name');
const emailField = document.getElementById('mail');
const jobTitleSelection = document.getElementById('title');
const otherJobTitle = document.getElementById('other-title');
const tShirtColors = document.getElementById('colors-js-puns');
const tShirtDesignSelection = document.getElementById('design');
const tShirtColorsTemplate = tShirtColors.innerHTML;
const paymentMethod = document.getElementById('payment');
const paymentCC = document.getElementById('credit-card');
const paymentPayPal = document.getElementById('paypal');
const paymentBitcoin = document.getElementById('bitcoin');
const ccNumber = document.getElementById('cc-num');
const ccZip = document.getElementById('zip');
const ccCvv = document.getElementById('cvv');

const activities = document.getElementsByClassName('activities')[0];
const activityConference = document.getElementsByName('all')[0];
const activityJSFrameworks = document.getElementsByName('js-frameworks')[0];
const activityJSLibs = document.getElementsByName('js-libs')[0];
const activityExpress = document.getElementsByName('express')[0];
const activityNode = document.getElementsByName('node')[0];
const activityBuildTools = document.getElementsByName('build-tools')[0];
const activityNPM = document.getElementsByName('npm')[0];

const activitiesListener = activities.getElementsByTagName('INPUT');
const createSumContainer = document.createElement('div');
createSumContainer.id = 'sum-container';

const activitiesErrorContainer = document.createElement('div');
activitiesErrorContainer.id = 'activities-error';
activities.appendChild(activitiesErrorContainer);

const submitButton = document.querySelectorAll('[type=submit]')[0];

console.log(activitiesListener);

// Set focus on the name input field
const initialFocus = function () {
    nameField.focus();
};

// Show an element
const showElement = function (elementID) {
    elementID.classList.add('is-visible');
    elementID.classList.remove('is-hidden');
};

// Hide an element
const hideElement = function (elementID) {
    elementID.classList.add('is-hidden');
    elementID.classList.remove('is-visible');
};

const initializeTshirtColors = function () {
    tShirtColors.innerHTML = '';
    tShirtColors.innerHTML = tShirtColorsTemplate;
};

const parallelTracks = function (firstTrack, secondTrack) {
    firstTrack.onchange = function () {
        this.checked ? (secondTrack.disabled = true) : (secondTrack.disabled = false);
    }
    secondTrack.onchange = function () {
        this.checked ? (firstTrack.disabled = true) : (firstTrack.disabled = false);
    }
}

jobTitleSelection.addEventListener('change', function () {
    if (this.value === 'other') {
        showElement(otherJobTitle);
    } else {
        hideElement(otherJobTitle);
    }
});

tShirtDesignSelection.addEventListener('change', function () {
    showElement(tShirtColors);
    initializeTshirtColors();
    if (this.value === 'js puns') {
        const jsPunsColors = document.getElementById('color');
        for (let i = 0; i < jsPunsColors.length; i++) {
            let currentColor = jsPunsColors.options[i].value;
            if (currentColor == 'tomato' || currentColor == 'steelblue' || currentColor == 'dimgrey') {
                jsPunsColors.options[i].remove();
                i--; // we decrease i, otherwise we would jump one of the colors
            }
        }
    } else if (this.value === 'heart js') {
        const jsPunsColors = document.getElementById('color');
        for (let i = 0; i < jsPunsColors.length; i++) {
            let currentColor = jsPunsColors.options[i].value;
            if (currentColor == 'cornflowerblue' || currentColor == 'darkslategrey' || currentColor == 'gold') {
                jsPunsColors.options[i].remove();
                i--; // we decrease i, otherwise we would jump one of the colors
            }
        }
    } else {
        hideElement(tShirtColors);
    }
});

const appendSum = function (totalPrice) {
    createSumContainer.innerHTML = '';
    const sum = `<h3 class="total-sum">Total: $${totalPrice}</h3>`
    createSumContainer.innerHTML = sum;
};

activities.addEventListener('change', function () {
    let price = 0;
    if (activityConference.checked) {
        price += 200;
    }
    for (let i = 1; activitiesListener.length > i; i++) {
        if (activitiesListener[i].checked) {
            price += 100;
        }
    }
    appendSum(price);
    validateActivities();
});

const defaultPayment = function () {
    hidePaymentMethods();
    paymentMethod.value = 'credit card';
    showElement(paymentCC);
}

const hidePaymentMethods = function () {
    hideElement(paymentCC);
    hideElement(paymentPayPal);
    hideElement(paymentBitcoin);
}

paymentMethod.addEventListener('change', function () {
    if (this.value === 'credit card') {
        defaultPayment();
    } else if (this.value === 'paypal') {
        hidePaymentMethods();
        showElement(paymentPayPal);
    } else {
        hidePaymentMethods();
        showElement(paymentBitcoin);
    }
});

const errorMessage = function (errorField, errorText) {
    const textContent = document.createElement('p');
    textContent.innerHTML = errorText;
    textContent.classList.add('error-message');
    textContent.id = errorField.id + '-error';
    errorField.parentNode.insertBefore(textContent, errorField.nextSibling);
};

const removeErrorMessage = function (errorField) {
    const errorMessageId = errorField.id + '-error';
    const errorMessage = document.getElementById(errorMessageId);
    errorField.parentNode.removeChild(errorMessage);
}

const validateName = function () {
    if (nameField.value === '' || nameField.value === null) {
        validate(false, nameField, 'empty-field', 'Please add a name.');
    } else {
        validate(true, nameField);
    }
};

const validateEmail = function () {
    isValid = emailField.checkValidity();
    if (!isValid || emailField.value === '') {
        validate(false, emailField, 'invalid-format', 'Please add a valid email.');
    } else {
        validate(true, emailField);
    }
};

const validateActivities = function () {
    let anyChecked = false;
    for (let i = 0; activitiesListener.length > i; i++) {
        if (activitiesListener[i].checked === true) {
            anyChecked = true;
        }
    }
    if (anyChecked === false) {
        validate(false, activitiesErrorContainer, 'missing-activity', 'Please select at least one activity');
    } else {
        validate(true, activitiesErrorContainer);
    }
};

const validatePayment = function () {
    if (paymentMethod.value === 'credit card') {
        validateCCNumber();
        validateCCZip();
        validateCvv();
    }
};

const validateCCNumber = function () {
    if (ccNumber.value.length <= 0) {
        validate(false, ccNumber, 'empty-field', 'Please enter a credit card number.');
    } else if (13 >= ccNumber.value.length || ccNumber.value.length >= 16) {
        validate(false, ccNumber, 'wrong-length', 'Please add a card with 13 to 16 digits.');
    } else {
        validate(true, ccNumber);
    }
};

const validate = function (passed, evaluatedElement, errorName = 0, errorMessage = 0) {
    // We need to remove all previous errors from this element
    const evaluatedElementId = evaluatedElement.id;
    const evaluatedElementErrors = document.querySelectorAll('*[class*="' + evaluatedElementId + '-"]');
    evaluatedElementErrors.forEach(function (element) {
        element.parentNode.removeChild(element);
    });
    if (passed) {
        evaluatedElement.classList.remove('input-error');
        evaluatedElement.classList.add('input-validated');
    } else {
        evaluatedElement.classList.add('input-error');
        evaluatedElement.classList.remove('input-validated');
        // Then we create the error that we need
        const errorContainer = document.createElement('p');
        errorContainer.classList.add(evaluatedElementId + '-' + errorName);
        errorContainer.innerHTML = errorMessage;
        errorContainer.classList.add('error-message');
        // We insert the error right after the evaluated field
        evaluatedElement.parentNode.insertBefore(errorContainer, evaluatedElement.nextSibling);
    }
};

const validateCCZip = function () {
    if (ccZip.value.length !== 5) {
        validate(false, ccZip, 'wrong-postal-code', 'Please add a 5 digit ZIP code.');
    } else {
        validate(true, ccZip);
    };
};

const validateCvv = function () {
    if (ccCvv.value.length !== 3) {
        validate(false, ccCvv, 'wrong-cvv', 'Please add a 3 digit CVV code.');
    } else {
        validate(true, ccCvv);
    }
};

nameField.addEventListener('blur', validateName);
emailField.addEventListener('blur', validateEmail);
ccNumber.addEventListener('blur', validateCCNumber);
ccZip.addEventListener('blur', validateCCZip);
ccCvv.addEventListener('blur', validateCvv);

submitButton.addEventListener('click', function (event) {
    validateName();
    validateEmail();
    validateActivities();
    validatePayment();
    event.preventDefault();
});

// We initialize all our functions
window.onload = initialFocus();
window.onload = defaultPayment();
hideElement(otherJobTitle);
hideElement(tShirtColors);
parallelTracks(activityJSFrameworks, activityExpress);
parallelTracks(activityJSLibs, activityNode);
activities.appendChild(createSumContainer);