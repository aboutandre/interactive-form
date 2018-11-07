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

nameField.addEventListener('blur', function () {
    if (nameField.value === '' || nameField.value === null) {
        if (nameField.nextElementSibling.classList.contains('error-message')) {
            return
        }
        nameField.classList.remove('input-validated');
        nameField.classList.add('input-error');
        errorMessage(nameField, 'Please add a name.');
    } else {
        if (!nameField.nextElementSibling.classList.contains('error-message')) {
            return
        }
        nameField.classList.remove('input-error');
        nameField.classList.add('input-validated');
        removeErrorMessage(nameField);
    }
});

emailField.addEventListener('blur', function () {
    isValid = emailField.checkValidity();

    if (!isValid || emailField.value === '') {
        if (emailField.nextElementSibling.classList.contains('error-message')) {
            return
        }
        emailField.classList.remove('input-validated');
        emailField.classList.add('input-error');
        errorMessage(emailField, 'Please add a valid email.');
    } else {
        if (!emailField.nextElementSibling.classList.contains('error-message')) {
            return
        }
        emailField.classList.remove('input-error');
        emailField.classList.add('input-validated');
        removeErrorMessage(emailField);
    }
});

const validateActivities = function () {
    const sumContainer = document.getElementById('sum-container');
    let anyChecked = false;
    for (let i = 0; activitiesListener.length > i; i++) {
        if (activitiesListener[i].checked === true) {
            anyChecked = true;
        }
    }
    if (anyChecked === false) {
        if (sumContainer.nextElementSibling !== null) {
            return
        }
        errorMessage(sumContainer, 'Please select at least one activity');
    } else {
        if (sumContainer.nextElementSibling === null) {
            return
        }
        removeErrorMessage(sumContainer);
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
        if (ccNumber.nextElementSibling !== null) {
            return
        }
        ccNumber.classList.add('input-error');
        ccNumber.classList.remove('input-validated');
        errorMessage(ccNumber, 'Please enter a credit card number.');
    } else if (13 > ccNumber.value.length || ccNumber.value.length > 16) {
        if (ccNumber.nextElementSibling !== null) {
            return
        }
        ccNumber.classList.add('input-error');
        ccNumber.classList.remove('input-validated');
        errorMessage(ccNumber, 'Please add a card with 13 to 16 digits.');
    } else {
        if (ccNumber.nextElementSibling === null) {
            return
        }
        ccNumber.classList.remove('input-error');
        ccNumber.classList.add('input-validated');
        removeErrorMessage(ccNumber);
    }
};

const validateCCZip = function () {
    if (ccZip.value.length !== 5) {
        if (ccZip.nextElementSibling !== null) {
            return
        }
        ccZip.classList.add('input-error');
        ccZip.classList.remove('input-validated');
        errorMessage(ccZip, 'Please add a 5 digit ZIP code.');
    } else {
        if (ccZip.nextElementSibling === null) {
            return
        }
        ccZip.classList.remove('input-error');
        ccZip.classList.add('input-validated');
        removeErrorMessage(ccZip);
    }
};

const validateCvv = function () {
    if (ccCvv.value.length !== 3) {
        if (ccCvv.nextElementSibling !== null) {
            return
        }
        ccCvv.classList.add('input-error');
        ccCvv.classList.remove('input-validated');
        errorMessage(ccCvv, 'Please add a 3 digit CVV code.');
    } else {
        if (ccCvv.nextElementSibling === null) {
            return
        }
        ccCvv.classList.remove('input-error');
        ccCvv.classList.add('input-validated');
        removeErrorMessage(ccCvv);
    }
};

ccNumber.addEventListener('blur', validateCCNumber);
ccZip.addEventListener('blur', validateCCZip);
ccCvv.addEventListener('blur', validateCvv);

submitButton.addEventListener('click', function (event) {
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