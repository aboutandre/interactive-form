const nameField = document.getElementById('name');
const jobTitleSelection = document.getElementById('title');
const otherJobTitle = document.getElementById('other-title');
const tShirtColors = document.getElementById('colors-js-puns');
const tShirtDesignSelection = document.getElementById('design');
const tShirtColorsTemplate = tShirtColors.innerHTML;
const paymentMethod = document.getElementById('payment');
const paymentCC = document.getElementById('credit-card');
const paymentPayPal = document.getElementById('paypal');
const paymentBitcoin = document.getElementById('bitcoin');

const activities = document.getElementsByClassName('activities')[0];
const activityConference = document.getElementsByName('all')[0];
const activityJSFrameworks = document.getElementsByName('js-frameworks')[0];
const activityJSLibs = document.getElementsByName('js-libs')[0];
const activityExpress = document.getElementsByName('express')[0];
const activityNode = document.getElementsByName('node')[0];
const activityBuildTools = document.getElementsByName('build-tools')[0];
const activityNPM = document.getElementsByName('npm')[0];

const activitiesListener = activities.getElementsByTagName('INPUT');
const sumContainer = document.createElement('div');

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

const appendSum = function(totalPrice) {
    sumContainer.innerHTML = '';
    const sum = `<h3 class="total-sum">Total: $${totalPrice}</h3>`
    sumContainer.innerHTML = sum;
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
});

const defaultPayment = function() {
    paymentMethod.value = 'credit card'
}

paymentMethod.addEventListener('change', function () {
    function hidePaymentMethods () {
        hideElement(paymentCC);
        hideElement(paymentPayPal);
        hideElement(paymentBitcoin);
    };
     if (this.value === 'credit card') {
        hidePaymentMethods();
        showElement(paymentCC);
    } else if (this.value === 'paypal') {
        hidePaymentMethods();
        showElement(paymentPayPal);
    } else {
        hidePaymentMethods();
        showElement(paymentBitcoin);
    }
});

const errorMessage = function(errorField, errorText) {
    const textContent = document.createElement('p');
    textContent.innerHTML = errorText;
    textContent.classList.add('error-message');
    errorField.parentNode.insertBefore(textContent, errorField.nextSibling);
};

const removeErrorMessage = function(inputId) {
    inputId.parentNode.removeChild(inputId.nextSibling)
}

nameField.addEventListener('blur', function() {
    if (nameField.value === '' || nameField.value === null) {
        if (this.nextElementSibling.classList.contains('error-message')) {
            return  
        }
        this.classList.remove('input-validated');
        this.classList.add('input-error');
        errorMessage(nameField, 'Please add a name');
    } else {
        this.classList.remove('input-error');
        this.classList.add('input-validated');
        removeErrorMessage(this);
    }
});

// We initialize all our functions
window.onload = initialFocus();
window.onload = defaultPayment();
hideElement(otherJobTitle);
hideElement(tShirtColors);
parallelTracks(activityJSFrameworks, activityExpress);
parallelTracks(activityJSLibs, activityNode);
activities.appendChild(sumContainer);