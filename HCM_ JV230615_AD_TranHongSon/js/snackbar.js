//Function snackbar

function warning(message) {
    let warning = document.createElement("div");
    warning.innerHTML = message;
    document.body.appendChild(warning);
    warning.classList.add("showWarning");
    setTimeout(() => {
        warning.remove();
    }, 3000);
}

function success(message) {
    let success = document.createElement("div");
    success.innerHTML = message;
    document.body.appendChild(success);
    success.classList.add("showSuccess");
    setTimeout(() => {
        success.remove();
    }, 3000);
}
