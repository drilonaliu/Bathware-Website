let signIn = document.getElementById("sign-in");
let signUp = document.getElementById("sign-up");
let signInForm = document.getElementById("sign-in-form");
let signUpForm = document.getElementById("sign-up-form");

signUpForm.style.display = 'none'


signIn.addEventListener("click", function (e) {
    signUp.classList.remove("active");
    signIn.classList.add("active");

    removeElement(signUpForm);
    appearElement(signInForm);

})

signUp.addEventListener("click", function (e) {
    signIn.classList.remove("active");
    signUp.classList.add("active");
    removeElement(signInForm);
    appearElement(signUpForm);
})

function removeElement(element) {
    element.style.display = 'none'
}

function appearElement(element) {
    element.style.display = 'block'
}