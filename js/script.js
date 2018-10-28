const nameField = document.getElementById('name');
const jobTitleSelection = document.getElementById('title');
const otherJobTitle = document.getElementById('other-title');
const tShirtColors = document.getElementById('colors-js-puns');
const tShirtDesignSelection = document.getElementById('design');
const tShirtColorsTemplate = tShirtColors.innerHTML;

const activityConference = document.getElementsByName('all')[0];
const activityJSFrameworks = document.getElementsByName('js-frameworks')[0];
const activityJSLibs = document.getElementsByName('js-libs')[0];
const activityExpress = document.getElementsByName('express')[0];
const activityNode = document.getElementsByName('node')[0];
const activityBuildTools = document.getElementsByName('build-tools')[0];
const activityNPM = document.getElementsByName('npm')[0];

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

const parallelTracks = function(firstTrack, secondTrack) {
    firstTrack.onchange = function() {
        this.checked ? (secondTrack.disabled = true) : (secondTrack.disabled = false);
    }
    secondTrack.onchange = function() {
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

// We initialize all our functions
window.onload = initialFocus();
hideElement(otherJobTitle);
hideElement(tShirtColors);
parallelTracks(activityJSFrameworks, activityExpress);
parallelTracks(activityJSLibs, activityNode);