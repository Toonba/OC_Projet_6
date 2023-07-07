// DOM Element
const main = document.getElementById('main')!
const modal = document.getElementById('contact_modal')!
const contactButton = document.getElementsByClassName('contact_button') as HTMLCollectionOf<HTMLButtonElement>
const closeButton = document.getElementsByClassName('close_button')!
const inputPrenom = document.getElementById('prenom') as HTMLInputElement
const inputNom = document.getElementById('nom') as HTMLInputElement
const inputEmail = document.getElementById('email') as HTMLInputElement
const inputTextarea = document.getElementById('message') as HTMLInputElement
const submitBtn = document.getElementsByClassName('btn-submit')!
const error = document.getElementsByClassName('error') as HTMLCollectionOf<HTMLSpanElement>
const myForm = document.getElementById('myForm') as HTMLFormElement

// error message
const messageErreurPrenom = 'Vous devez indiqué votre prénom, il doit contenir au moins 2 lettres'
const messageErreurNom = 'Vous devez indiqué votre nom, il doit contenir au moins 2 lettres'
const messageErreurMail = 'Vous devez renseigner une adresse mail valide'
const messageErreurTextarea = 'Vous ne pouvez pas envoyer un message vide'

// objet input, each Input object represent all the data related to 1 input and needed for the validation and layout validation of this input.

class InputProperties {
  input: HTMLInputElement
  type: string
  span: number
  message: string

  constructor(input: HTMLInputElement, type: string, span: number, message: string) {
    this.input = input
    this.type = type
    this.span = span
    this.message = message
  }
}
const prenom = new InputProperties(inputPrenom, 'text', 0, messageErreurPrenom)
const nom = new InputProperties(inputNom, 'text', 1, messageErreurNom)
const email = new InputProperties(inputEmail, 'mail', 2, messageErreurMail)
const textarea = new InputProperties(inputTextarea, 'text', 3, messageErreurTextarea)

// Variable
const myInput = [prenom, nom, email, textarea]
let validationState: boolean[] = []

// form validation
// regex
const emailRegEx = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/

// add specific layout if an input isn't valid
function notValid(InputProperties: InputProperties) {
  error[InputProperties.span].style.display = 'block'
  InputProperties.input.style.border = '2px solid rgb(200, 1, 1)'
  InputProperties.input.style.animation = 'nop 0.2s 3'
  error[InputProperties.span].innerHTML = InputProperties.message
  InputProperties.input.setAttribute('aria-invalid', 'true')
  error[InputProperties.span].setAttribute('tabindex', '-1')
  error[InputProperties.span].focus()
}

// Remove specific layout once an input is valid
function isValid(InputProperties: InputProperties) {
  error[InputProperties.span].style.display = 'none'
  InputProperties.input.style.border = 'none'
  validationState.push(true)
  InputProperties.input.setAttribute('aria-invalid', 'false')
}

// function openning modal and adding accessible attribute
function displayModal() {
  modal.style.display = 'block'
  main.setAttribute('aria-hidden', 'true')
  modal.setAttribute('aria-hidden', 'false')
  inputPrenom.focus()
  myInput.forEach((element) => {
    isValid(element)
  })
  validationState = []
}
// function closing modal and adding accessible attribute
function closeModal() {
  modal.style.display = 'none'
  myForm.reset()
  main.setAttribute('aria-hidden', 'false')
  modal.setAttribute('aria-hidden', 'true')
  contactButton[0].focus()
}

// function that check the validity of input
function inputValidation(InputProperties: InputProperties) {
  if (InputProperties.type === 'text') {
    if (InputProperties.input.value === '' || InputProperties.input.value.length < 2 || InputProperties.input.value.trim() === '') {
      notValid(InputProperties)
    } else {
      isValid(InputProperties)
    }
  } else if (InputProperties.type === 'mail') {
    if (InputProperties.input.value === '' || !InputProperties.input.value.match(emailRegEx)) {
      notValid(InputProperties)
    } else {
      isValid(InputProperties)
    }
  }
}

// Event listner to show error when focus out

myInput.forEach((element) => {
  if (element.input) {
    element.input.addEventListener('focusout', () => {
      inputValidation(element)
    })
  }
})

// used in files ../pages/photographer.js
// eslint-disable-next-line no-unused-vars
export function modalEvent() {
  // open modal with mouse
  contactButton[0].addEventListener('click', displayModal)
  // close modal with mouse
  closeButton[0].addEventListener('click', closeModal)
  // open with keyboard
  contactButton[0].addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      displayModal()
    }
  })
  // close with keyboard
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.style.display === 'block') {
      e.preventDefault()
      closeModal()
    }
  })
  closeButton[0].addEventListener('keydown', function (e: KeyboardEvent) {
    if (e.key === 'Enter') {
      e.preventDefault()
      closeModal()
    }
  } as EventListener)

  // event listener to ensure form is correctly handled before submiting
  submitBtn[0].addEventListener('click', (e) => {
    e.preventDefault()
    validationState = []
    myInput.forEach((element) => {
      inputValidation(element)
    })
    if (!validationState.includes(false) && validationState.length === 4) {
      console.log(prenom.input.value)
      console.log(nom.input.value)
      console.log(email.input.value)
      console.log(textarea.input.value)
      closeModal()
    }
  })
}
