/******************************************
Treehouse Techdegree:
FSJS project 3 - Build an Interactive Form
******************************************/

// Here we create all the variables that we need for our app
const nameField = document.getElementById('name');
const emailField = document.getElementById('mail');
const jobTitleSelection = document.getElementById('title');
const otherJobTitle = document.getElementById('other-title');
const tShirtColors = document.getElementById('colors-js-puns');
const tShirtDesignSelection = document.getElementById('design');
// We make a copy of the t-shirt colors to be able to remove items depending on the design selection
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

// We require a couple of elements that are not present in the DOM at load time
const activitiesErrorContainer = document.createElement('div');
activitiesErrorContainer.id = 'activities-error';
activities.appendChild(activitiesErrorContainer);

const createSumContainer = document.createElement('div');
createSumContainer.id = 'sum-container';

const submitButton = document.querySelectorAll('[type=submit]')[0];

// Set focus on the name input field
const initialFocus = function () {
    nameField.focus();
};

// Function used to show an element
const showElement = function (elementID) {
    elementID.classList.add('is-visible');
    elementID.classList.remove('is-hidden');
};

// Function used to hide an element
const hideElement = function (elementID) {
    elementID.classList.add('is-hidden');
    elementID.classList.remove('is-visible');
};

// This function checks if two tracks given have conflicting time slots
const parallelTracks = function (firstTrack, secondTrack) {
    firstTrack.onchange = function () {
        this.checked ? (secondTrack.disabled = true) : (secondTrack.disabled = false);
    }
    secondTrack.onchange = function () {
        this.checked ? (firstTrack.disabled = true) : (firstTrack.disabled = false);
    }
}

// If the user selects a job title "other", then we show the "Other Job" field
jobTitleSelection.addEventListener('change', function () {
    if (this.value === 'other') {
        showElement(otherJobTitle);
    } else {
        hideElement(otherJobTitle);
    }
});

// When this function is called we set the content of the t-shirt design `select` dropdown to the template copy that we did with `tShirtColorsTemplate`
const initializeTshirtColors = function () {
    tShirtColors.innerHTML = '';
    tShirtColors.innerHTML = tShirtColorsTemplate;
};

// We listen for any changes on the t-shirt design `select` dropdown
tShirtDesignSelection.addEventListener('change', function () {
    showElement(tShirtColors);
    initializeTshirtColors();
    // This will controll the second dropdown to show only `js puns` tshirts
    if (this.value === 'js puns') {
        const jsPunsColors = document.getElementById('color');
        for (let i = 0; i < jsPunsColors.length; i++) {
            let currentColor = jsPunsColors.options[i].value;
            // We remove all the colors from the oposite group
            if (currentColor == 'tomato' || currentColor == 'steelblue' || currentColor == 'dimgrey') {
                jsPunsColors.options[i].remove();
                i--; // we decrease i, otherwise we would jump one of the colors
            }
        }
        // This will controll the second dropdown to show only `heart js` tshirts
    } else if (this.value === 'heart js') {
        const jsPunsColors = document.getElementById('color');
        for (let i = 0; i < jsPunsColors.length; i++) {
            let currentColor = jsPunsColors.options[i].value;
            // We remove all the colors from the oposite group
            if (currentColor == 'cornflowerblue' || currentColor == 'darkslategrey' || currentColor == 'gold') {
                jsPunsColors.options[i].remove();
                i--; // we decrease i, otherwise we would jump one of the colors
            }
        }
    } else {
        // If the users doesnt select either designs we hide the dropdown
        hideElement(tShirtColors);
    }
});

// We create a sum element to be used for the price of all chose activities
const appendSum = function (totalPrice) {
    // If there was a sum already, we get rid of it
    createSumContainer.innerHTML = '';
    const sum = `<h3 class="total-sum">Total: $${totalPrice}</h3>`
    createSumContainer.innerHTML = sum;
};

// We listen for changes in the activities selection
activities.addEventListener('change', function () {
    // We set the initial cost to zero
    let price = 0;
    // Since the "Main Conference" is the only one that costs $200 it gets it's own conditional
    if (activityConference.checked) {
        price += 200;
    }
    // For all the other activities we sum the price in $100 increments
    for (let i = 1; activitiesListener.length > i; i++) {
        if (activitiesListener[i].checked) {
            price += 100;
        }
    }
    // Now we show the price
    appendSum(price);
    // If the user deselects all activities she will get an error
    validateActivities();
});

// We set the default payment to credit card
const defaultPayment = function () {
    // We always hide all the methods that we don't need
    hidePaymentMethods();
    // We set the payment method dropdown to credit card
    paymentMethod.value = 'credit card';
    // And we show the credit card relevant fields
    showElement(paymentCC);
};

// In this function we hide all the payment methods
const hidePaymentMethods = function () {
    hideElement(paymentCC);
    hideElement(paymentPayPal);
    hideElement(paymentBitcoin);
};

// We listen for changes in the payment dropdown 
paymentMethod.addEventListener('change', function () {
    // If CC we re-run the default payment method function
    if (this.value === 'credit card') {
        defaultPayment();
        // If Paypal we hide all the methods and show only PP
    } else if (this.value === 'paypal') {
        hidePaymentMethods();
        showElement(paymentPayPal);
        // The last option is Bitcoin, same as PP we hide all and show only Bitcoin
    } else {
        hidePaymentMethods();
        showElement(paymentBitcoin);
    }
});

// This is the validate function
// It takes four parameters, two mandatory and two optionals
// 'passed' defines if the condition, well... passes. It's a boolean
// 'evaluatedElement' is the element that will be evaluated. It uses the variables defined at the top of this file
// 'errorName' is optional and serves to be help debugging
// 'errorMessage' is also optional (in case we are removing the error we don't need to pass a message)
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

const validateIsNumber = function (event) {
    // We check if the number is an integer
    let isNumber = isFinite(event.key);
    // We prevent the user to type spaces
    console.log('This is an integer: ' + isNumber);
    if (event.which === 32) {
        event.preventDefault();
    }
    // If the key pressed is an arrow or backspace we allow the input
    else if (event.charCode === 0) {
        return true
    }
    // If the key pressed is not an integer we return false
    else if (!isNumber) {
        event.preventDefault();
        return false;
    } 
    // If what the user typed is a number we return true
    else if (isNumber) {
        return true;
    }
};

// Function to validate if the name is not empty
const validateName = function () {
    if (nameField.value === '' || nameField.value === null) {
        validate(false, nameField, 'empty-field', 'Please add a name.');
    } else {
        validate(true, nameField);
    }
};

// Function to validate if the email has a valid format
const validateEmail = function () {
    // The checkValidity method works using the type attribute of the email field 
    isValid = emailField.checkValidity();
    // If it's invalid
    if (!isValid) {
        validate(false, emailField, 'invalid-format', 'Please add a valid email.');
        // If it's empty
    } else if (emailField.value === '' || emailField.value === null) {
        validate(false, emailField, 'empty-field', 'Please add an email.');
    } else {
        validate(true, emailField);
    }
};

// Function to validate if any activity has been selected 
const validateActivities = function () {
    // We create a variable that will change any *any* of the activities has been selected
    let anyChecked = false;
    // We loop through all the activities and if any of them are checked, we set the 'anyChecked' to true
    for (let i = 0; activitiesListener.length > i; i++) {
        if (activitiesListener[i].checked === true) {
            anyChecked = true;
        }
    }
    // If none are checked we show an error
    if (anyChecked === false) {
        validate(false, activitiesErrorContainer, 'missing-activity', 'Please select at least one activity');
        // Else we don't show any error or remove the present one 
    } else {
        validate(true, activitiesErrorContainer);
    }
};

// Function to validate all the credit card fields
const validatePayment = function () {
    // We only run if the payment method selected is the credit card
    if (paymentMethod.value === 'credit card') {
        validateCCNumber();
        validateCCZip();
        validateCvv();
    // Otherwise we remove all errors from the fields before submitting
    } else {
        validate(true, ccNumber);
        validate(true, ccCvv);
        validate(true, ccZip);
    }
};

// Function to validate if the CC number is correct
const validateCCNumber = function () {
    // If empty we show an error if the proper message
    if (ccNumber.value.length < 0) {
        validate(false, ccNumber, 'empty-field', 'Please enter a credit card number.');
        // If the length of the number is not between 13 and 16 we show the proper message
    } else if (13 >= ccNumber.value.length || ccNumber.value.length >= 16) {
        validate(false, ccNumber, 'wrong-length', 'Please add a card with 13 to 16 digits.');
        // Else we don't show any error or remove the present one 
    } else {
        validate(true, ccNumber);
    }
};

// Function to validate if the CC Postal Code/ZIP is exactly 5 digits long
const validateCCZip = function () {
    if (ccZip.value.length !== 5) {
        validate(false, ccZip, 'wrong-postal-code', 'Please add a 5 digit ZIP code.');
    } else {
        validate(true, ccZip);
    };
};

// Function to validate if the CC CVV is exactly 3 digits long
const validateCvv = function () {
    if (ccCvv.value.length !== 3) {
        validate(false, ccCvv, 'wrong-cvv', 'Please add a 3 digit CVV code.');
    } else {
        validate(true, ccCvv);
    }
};

// We listen for all the input fields and validate them on focus out
nameField.addEventListener('blur', validateName);
emailField.addEventListener('blur', validateEmail);
ccNumber.addEventListener('blur', validateCCNumber);
ccCvv.addEventListener('blur', validateCvv);
ccZip.addEventListener('blur', validateCCZip);

// For the credit card, zip and cvv we listen to key presses and allow only numbers
// If the user tries to type anything but a number we show an error message
ccNumber.addEventListener('keypress', event => {
    console.log('Im listening for events. This one is: '+ validateIsNumber(event));
    if (!validateIsNumber(event)) {
        validate(false, ccNumber, 'cc-not-numbers', 'Please add numbers only!');
    }
});
ccZip.addEventListener('keypress', event => {
    if (!validateIsNumber(event)) {
        validate(false, ccZip, 'zip-not-numbers', 'Please add numbers only!');
    }
});
ccCvv.addEventListener('keypress', event => {
    if (!validateIsNumber(event)) {
        validate(false, ccCvv, 'cvv-not-numbers', 'Please add numbers only!');
    }
});

// The submit button validates all the fields and checkboxes on being clicked
submitButton.addEventListener('click', function (event) {
    validateName();
    validateEmail();
    validateActivities();
    validatePayment();
    if (document.querySelector('.error-message') !== null) {
        // If errors are present we prevent the form to submit
        event.preventDefault();
    }
});

// We initialize all our functions
// We set the focus on the name field
window.onload = initialFocus();
// We set the default payment, in this case credit card
window.onload = defaultPayment();
// We hide the job role "Other" field, since it will be controlled by the job role dropdown
hideElement(otherJobTitle);
// We hide the t-shirt colors, since they will be controlled by the design dropdown
hideElement(tShirtColors);
// Define the parallel tracks that cannot be selected at the same time
parallelTracks(activityJSFrameworks, activityExpress);
parallelTracks(activityJSLibs, activityNode);
// We append the sum container that will be used to show the total price of the activities 
activities.appendChild(createSumContainer);