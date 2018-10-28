const nameField =  document.getElementById('name');
const jobTitleSelection = document.getElementById('title');
const otherJobTitle = document.getElementById('other-title');
const tShirtColors = document.getElementById('colors-js-puns');
const tShirtDesignSelection = document.getElementById('design');
const tShirtColorsTemplate = tShirtColors.innerHTML;

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

// We initialize all our functions
window.onload = initialFocus();
hideElement(otherJobTitle);
hideElement(tShirtColors);
