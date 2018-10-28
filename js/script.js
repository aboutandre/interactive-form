const initialFocus = function () {
    document.getElementById('name').focus();
    console.log('Set focus!');
};

const jobTitleSelection = document.getElementById('title');

// Show an element
const showElement = function (el) {
    const element = document.getElementById(el);
    element.classList.add('is-visible');
    element.classList.remove('is-hidden');
};

// Hide an element
const hideElement = function (el) {
    const element = document.getElementById(el);
    element.classList.add('is-hidden');
    element.classList.remove('is-visible');
};

// Toggle element visibility
const toggleElement = function (el) {
    const element = document.getElementById(el);
    element.classList.toggle('is-visible');
    element.classList.toggle('is-hidden');
};

jobTitleSelection.addEventListener("change", function () {
    if (this.value === 'other') {
        showElement('other-title');
    } else {
        hideElement('other-title');
    }
});

// We initialize all our functions
window.onload = initialFocus();
hideElement('other-title');