// DOM Element
const main = document.getElementById("main");
const modal = document.getElementById("contact_modal");
const contactButton = document.getElementsByClassName("contact_button");
const closeButton = document.getElementsByClassName("close_button");
const modalBody = document.getElementsByClassName("modal");
const prenom = document.getElementById("prenom");
const nom = document.getElementById("nom");
const email = document.getElementById("email");
const submitBtn = document.getElementsByClassName("btn-submit");
const error = document.getElementsByClassName("error");
const textarea = document.getElementById("message");
const myForm = document.getElementById("myForm");

//error message
const messageErreurPrenom = "Vous devez indiqué votre prénom, il doit contenir au moins 2 lettres";
const messageErreurNom = "Vous devez indiqué votre nom, il doit contenir au moins 2 lettres";
const messageErreurMail = "Vous devez renseigner une adresse mail valide";
const messageErreurTextarea = "Vous ne pouvez pas envoyer un message vide";

//Variables
let myInput = [prenom, nom, email, textarea];
let myType = ["text", "text", "mail", "text"];
let myMessages = [messageErreurPrenom, messageErreurNom, messageErreurMail, messageErreurTextarea];
let validationState = [];

// Event listener to open or close modal : classic way + accessible way
contactButton[0].addEventListener("click", displayModal);
closeButton[0].addEventListener("click", closeModal);
window.addEventListener("keydown", function (e) {
    if (e.key === "Escape") {
        e.preventDefault();
        closeModal(e);
    }
});
contactButton[0].addEventListener("keydown", function (e) {
    if (e.key === "Enter") {
        e.preventDefault();
        displayModal(e);
    }
});

closeButton[0].addEventListener("keydown", function (e) {
    if (e.key === "Enter") {
        e.preventDefault();
        closeModal(e);
    }
});

// function openning modal and adding accessible attribute
function displayModal() {
    modal.style.display = "block";
    main.setAttribute("aria-hidden", "true");
    modal.setAttribute("aria-hidden", "false");
    modalBody[0].setAttribute("tabindex", "0");
    modalBody[0].focus();
    isValid(prenom, 0);
    isValid(nom, 1);
    isValid(email, 2);
    isValid(textarea, 3);
    validationState = [];
}
// function closing modal and adding accessible attribute
function closeModal() {
    modal.style.display = "none";
    main.setAttribute("aria-hidden", "false");
    modal.setAttribute("aria-hidden", "true");
    modalBody[0].removeAttribute("tabindex", "0");
    myForm.reset();
    contactButton[0].focus();
}

//form validation

//regex
const emailRegEx = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

// add specific layout if an input isn't valid
function notValid(input, spanNumber, message) {
    error[spanNumber].style.display = "block";
    input.style.border = "2px solid rgb(200, 1, 1)";
    input.style.animation = "nop 0.2s 3";
    error[spanNumber].innerHTML = message;
    input.setAttribute("aria-invalid", "true");
}

// Remove specific layout once an input is valid
function isValid(input, spanNumber) {
    error[spanNumber].style.display = "none";
    input.style.border = "none";
    validationState.push(true);
    input.setAttribute("aria-invalid", "false");
}

//sortir la fonction de l'event lsitener pour pouvoir gerer focusout ou click

//function that check the validity of input
function inputValidation(input, type, spanNumber, message) {
    if (type == "text") {
        if (input.value == "" || input.value.length < 2 || input.value.trim() == false) {
            notValid(input, spanNumber, message);
            return false;
        } else {
            isValid(input, spanNumber);
        }
    } else if (type == "mail")
        if (input.value == "" || !input.value.match(emailRegEx)) {
            notValid(input, spanNumber, message);
            return false;
        } else {
            isValid(input, spanNumber);
        }
}

for (let i = 0; i < myInput.length; i++) {
    myInput[i].addEventListener("focusout", function (e) {
        inputValidation(myInput[i], myType[i], i, myMessages[i]);
    });
}

submitBtn[0].addEventListener("click", function (e) {
    e.preventDefault();
    for (let i = 0; i < myInput.length; i++) {
        inputValidation(myInput[i], myType[i], i, myMessages[i]);
    }
    if (!validationState.includes(false) && validationState.length == 4) {
        console.log(prenom.value);
        console.log(nom.value);
        console.log(email.value);
        console.log(textarea.value);
        closeModal();
    }
});
