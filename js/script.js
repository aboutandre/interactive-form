const initialFocus = function () {
    document.getElementById('name').focus();
    console.log('Set focus!');
};

window.onload = initialFocus();
