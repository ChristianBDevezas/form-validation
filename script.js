window.addEventListener("load", () => {
  setTimeout(() => {
    document.querySelector(".container").classList.add("change");
    // document.querySelector(".buttons").style.transform = "translateY(0px)";
  }, 500);
});

const form = document.getElementById("form");
const formContainers = document.querySelectorAll(".form-container");
const userName = document.getElementById("name");
const userEmail = document.getElementById("email");
const userPassword = document.getElementById("password");
const userPassword2 = document.getElementById("password2");
const reset = document.querySelector("button[type='reset']");

// Display error message and red border
const displayError = (input, message) => {
  const formContainer = input.parentElement;
  formContainer.className = 'form-container error';
  const span = formContainer.querySelector('span');
  span.innerText = message;
}

// Display green border
const displaySuccess = (input) => {
  const formContainer = input.parentElement;
  formContainer.className = 'form-container success';
  // remove green border after 2 seconds
  // setTimeout(() => formContainer.className = "form-container", 2000);
}

// Email validation
const checkEmail = (input) => {
  const regExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if(regExp.test(input.value.trim())) {
    displaySuccess(input);
  }
  else {
    displayError(input, 'Email is not valid');
  }
}

// Check all fields
const checkFields = (inputArr) => {
  inputArr.forEach(function(input) {
    if(input.value.trim() === '') {
      displayError(input, `${input.id.charAt(0).toUpperCase() + input.id.slice(1)} is required`);
    }
    else {
      displaySuccess(input);
    }
  });
}

// Check input length
const checkLength = (input, min, max) => {
  if(input.value.length < min) {
    displayError(input, `${input.id.charAt(0).toUpperCase() + input.id.slice(1)} must have at least ${min} characters`);
  } 
  else if(input.value.length > max) {
    displayError(input, `${input.id.charAt(0).toUpperCase() + input.id.slice(1)} must have less than ${max} characters`);
  } 
  else {
    displaySuccess(input);
  }
}

// Check if passwords match
const checkMatch = (input1, input2) => {
  if(input1.value !== input2.value) {
    displayError(input2, 'Passwords do not match');
  }
}

form.addEventListener('submit', (e) => {
  e.preventDefault();

  // if(!checkFields([userName, userEmail, userPassword, userPassword2])) {
  //   checkLength(userName, 5, 25);
  //   checkLength(userPassword, 6, 20);
  //   checkEmail(userEmail);
  //   checkMatch(userPassword, userPassword2);
  // }

  checkFields([userName, userEmail, userPassword, userPassword2]);
  checkLength(userName, 5, 25);
  checkLength(userPassword, 6, 20);
  checkEmail(userEmail);
  checkMatch(userPassword, userPassword2);
});

// Reset Button
reset.addEventListener("click", () => { 
  formContainers.forEach((item) => {
    item.className = "form-container";
  });
});