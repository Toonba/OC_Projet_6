// DOM Element
const main = document.getElementById("main");
const modal = document.getElementById("contact_modal");
const contactButton = document.getElementsByClassName("contact_button");
const closeButton = document.getElementsByClassName("close_button");
const modalBody = document.getElementsByClassName("modal");
const inputPrenom = document.getElementById("prenom");
const inputNom = document.getElementById("nom");
const inputEmail = document.getElementById("email");
const inputTextarea = document.getElementById("message");
const submitBtn = document.getElementsByClassName("btn-submit");
const error = document.getElementsByClassName("error");
const myForm = document.getElementById("myForm");

//error message
const messageErreurPrenom = "Vous devez indiqué votre prénom, il doit contenir au moins 2 lettres";
const messageErreurNom = "Vous devez indiqué votre nom, il doit contenir au moins 2 lettres";
const messageErreurMail = "Vous devez renseigner une adresse mail valide";
const messageErreurTextarea = "Vous ne pouvez pas envoyer un message vide";

//objet input, each Input object represent all the data related to 1 input and needed for the validation and layout validation of this input.
class obj {
    constructor(input, type, span, message) {
        this.input = input;
        this.type = type;
        this.span = span;
        this.message = message;
    }
}
let prenom = new obj(inputPrenom, "text", 0, messageErreurPrenom);
let nom = new obj(inputNom, "text", 1, messageErreurNom);
let email = new obj(inputEmail, "mail", 2, messageErreurMail);
let textarea = new obj(inputTextarea, "text", 3, messageErreurTextarea);

//Variable
let myInput = [prenom, nom, email, textarea];
let validationState = [];

// function openning modal and adding accessible attribute
function displayModal() {
    modal.style.display = "block";
    main.setAttribute("aria-hidden", "true");
    modal.setAttribute("aria-hidden", "false");
    modalBody[0].setAttribute("tabindex", "0");
    prenom.input.focus();
    myInput.forEach((element) => {
        isValid(element);
    });
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
//for the next 3 function param {obj} refer to Input object
function notValid(obj) {
    error[obj.span].style.display = "block";
    obj.input.style.border = "2px solid rgb(200, 1, 1)";
    obj.input.style.animation = "nop 0.2s 3";
    error[obj.span].innerHTML = obj.message;
    obj.input.setAttribute("aria-invalid", "true");
    error[obj.span].setAttribute("tabindex", "0");
    error[obj.span].focus();
}

// Remove specific layout once an input is valid
function isValid(obj) {
    error[obj.span].style.display = "none";
    obj.input.style.border = "none";
    validationState.push(true);
    obj.input.setAttribute("aria-invalid", "false");
}

//function that check the validity of input
function inputValidation(obj) {
    if (obj.type == "text") {
        if (obj.input.value == "" || obj.input.value.length < 2 || obj.input.value.trim() == false) {
            notValid(obj);
            return false;
        } else {
            isValid(obj);
        }
    } else if (obj.type == "mail")
        if (obj.input.value == "" || !obj.input.value.match(emailRegEx)) {
            notValid(obj);
            return false;
        } else {
            isValid(obj);
        }
}

// Event listner to show error when focus out
myInput.forEach((element) => {
    element.input.addEventListener("focusout", function (e) {
        inputValidation(element);
    });
});

function modalEvent() {
    //open modal with mouse
    contactButton[0].addEventListener("click", displayModal);
    //close modal with mouse
    closeButton[0].addEventListener("click", closeModal);
    //open with keyboard
    contactButton[0].addEventListener("keydown", function (e) {
        if (e.key === "Enter") {
            e.preventDefault();
            displayModal(e);
        }
    });
    //close with keyboard
    window.addEventListener("keydown", function (e) {
        if (e.key === "Escape") {
            e.preventDefault();
            closeModal(e);
        }
    });
    closeButton[0].addEventListener("keydown", function (e) {
        if (e.key === "Enter") {
            e.preventDefault();
            closeModal(e);
        }
    });
    //event listener to ensure form is correctly handled before submiting
    submitBtn[0].addEventListener("click", function (e) {
        e.preventDefault();
        validationState = [];
        console.log(validationState);
        myInput.forEach((element) => {
            inputValidation(element);
        });
        console.log(validationState);
        if (!validationState.includes(false) && validationState.length == 4) {
            console.log(prenom.input.value);
            console.log(nom.input.value);
            console.log(email.input.value);
            console.log(textarea.input.value);
            closeModal();
        }
    });
}
