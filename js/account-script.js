let changePass = document.querySelector(".change-pass");
let editButton = document.querySelector("#edit-password");
let password = document.querySelector(".password");
let passwordError = document.querySelector("#password-error");

let editAddr = document.querySelector("#edit-address button");
let confirmAddr = document.querySelector(".address-details button");
let addressError = document.querySelector("#address-error");

let phoneNumber = document.querySelector('.address-details input[name="phone"]');

const phoneNumberFormat = /^3834\d{7}$/;

let counter = 0;

function editPassword() {
    fadeOut(editButton);
    fadeIn(changePass, "flex");
}

function confirmPassword() {
    let newPassword = document.querySelector('input[name="new-password"]');
    let confirmPassword = document.querySelector('input[name="confirm-new-password"]');
    if (newPassword.value === confirmPassword.value) {
        if (newPassword.value.length >= 8) {
            let passValue = "Password: ";
            for (let index = 0; index < newPassword.value.length; index++) {
                passValue += "*";
            }
            password.innerHTML = passValue;
            fadeOut(changePass);
            fadeIn(editButton, "block");
            passwordError.innerHTML = "";
            newPassword.value = "";
            confirmPassword.value = "";
        }
        else {
            passwordError.innerHTML = "Password must have more than 8 characters";
        }
    }
    else {
        passwordError.innerHTML = "The passwords do not match";
    }
}

function addressEdit() {
    if (counter % 2 == 0) {
        let inputs = document.querySelectorAll(".address-details input");
        for (let input of inputs) {
            input.removeAttribute("readonly");
        }
        editAddr.innerHTML = "Confirm Changes";
        counter++;
    }
    else {
        let checkEmpty = 0;
        let inputs = document.querySelectorAll(".address-details input");
        for (let input of inputs) {
            if (input.value === "")
                checkEmpty++;
        }
        if (checkEmpty > 0) {
            addressError.innerHTML = "All fields must be filled";
        }
        else if (!phoneNumberFormat.test(phoneNumber.value)) {
            addressError.innerHTML = "Phone number format should be: 3834*******"
        }
        else {
            for (let input of inputs) {
                input.setAttribute("readonly", "");
            }
            editAddr.innerHTML = "Edit Address";
            addressError.innerHTML ="";
            counter++;
        }
    }
}

function fadeIn(div, display) {
    div.style.display = display;
    let opacity = 0;
    let interval = setInterval(function () {
        if (opacity <= 1) {
            opacity = opacity + 0.1;
            div.style.opacity = opacity;
        } else {
            clearInterval(interval);
        }
    }, 30);
}

function fadeOut(div) {
    let opacity = 1;
    let interval = setInterval(function () {
        if (opacity > 0) {
            opacity = opacity - 0.1;
            div.style.opacity = opacity;
        } else {
            clearInterval(interval);
        }
    }, 30);
    div.style.display = "none";
}