// requirements
// username must have 5-12 characters
// email must be in proper formate
// password min-8 max-16

'use strict;'

//elements selection
//inputs
const formEl = document.getElementById('form')
const displayNameEl = document.getElementById('username');
const emailEl = document.getElementById('email');
const passwordEl = document.getElementById('password');
//btn
const submitBtn = document.getElementById('submit-btn');

//imports
import { createAuthUserWithEmailAndPassword } from './firebase.js'


//function
const init = () => { }

// regex pattern for email
function validEmailRegex(email) {
    // there are lots and lots of patterns available (developer choose)
    // var pattern =/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    var pattern = /^[\w.-]+@[\w.-]+\.\w+$/;
    return pattern.test(email);
    // test() method is a function available in JavaScript that is used to check whether a given string matches a specified regex pattern.
}

function displayError(inputEl, message) {
    // selecting parent element by parentElement operator
    const formControl = inputEl.parentElement
    formControl.classList.add('error')
    formControl.classList.remove('success')
    const messageEl = formControl.querySelector('.msg');
    messageEl.innerText = `${message} is mandatory`
}

function displaySuccess(inputEl) {
    const formControl = inputEl.parentElement
    formControl.classList.add('success')
    formControl.classList.remove('error')
}

function displayWarn(inputEl, message) {
    const formControl = inputEl.parentElement
    const messageEl = formControl.querySelector('.msg');
    messageEl.innerText = `${message} length is not enough`
}

function displayWarnForMore(inputEl, message, length) {
    const formControl = inputEl.parentElement
    formControl.classList.add('error')
    formControl.classList.remove('success')
    const messageEl = formControl.querySelector('.msg');
    messageEl.innerText = `${message} length is not contains more than ${length} characters`
}

function displayErrorForRegex(inputEl, message) {
    const formControl = inputEl.parentElement
    formControl.classList.add('error')
    formControl.classList.remove('success')
    const messageEl = formControl.querySelector('.msg');
    messageEl.innerText = `Your ${message} is not valid`
}

// all input validations
function isUsernameValid(userName) {
    if (!userName) {
        displayError(displayNameEl, "Username")
    } else if (userName.length < 5) {
        displayWarn(displayNameEl, "Username")
    } else if (userName.length > 12) {
        displayWarnForMore(displayNameEl, "Username", 12)
    } else {
        displaySuccess(displayNameEl)
    }
}

function isEmailValid(email) {
    if (!email) {
        displayError(emailEl, "Email")
    } else if (!validEmailRegex(email)) {
        displayErrorForRegex(emailEl, "Email")
    } else {
        displaySuccess(emailEl)
    }
}

function isPasswordValid(password) {
    if (!password) {
        displayError(passwordEl, "Password")
    } else if (password.length < 8) {
        displayWarn(passwordEl, "Password")
    } else if (password.length > 18) {
        displayWarnForMore(passwordEl, "Password", 18)
    } else {
        displaySuccess(passwordEl)
    }
}

//events

// // if we done the event with form element we have to provide submit action

// formEl.addEventListener('submit', (event) => {
//     console.log(event.preventDefault())
// })

submitBtn.addEventListener('click', async(event) => {
    event.preventDefault()

    // //with element (name).value ===> this is to get a value of an inputs 
    const displayName = displayNameEl.value.trim();
    const email = emailEl.value.trim();
    const password = passwordEl.value.trim();

    isUsernameValid(displayName);
    isEmailValid(email);
    isPasswordValid(password);

    const user = {
        displayName: displayName,
        email: email,
        password: password
    }

    console.log(user)

    const userDocRef = await createAuthUserWithEmailAndPassword(email, password)
    console.log(userDocRef)
})

//initial settings
init()