//FULL NAME AND EMAIL VALIDATION ON FORM IN JOIN SECTION

//get elements
const form = document.querySelector(".join-form");
const fullName = document.getElementById("full-name");
const emailField = document.getElementById("email");
const joinButton = document.getElementById("join-button");

const nameMsg = form.querySelector(".name-msg");
const emailMsg = form.querySelector(".email-msg");

const validEmail = form.querySelector(".valid-email");
const validName = form.querySelector(".valid-name");
const formInput = document.querySelector("input");
const errorEmail = document.querySelector(".error-email");
const errorName = document.querySelector(".error-name");


//add eventlistener
joinButton.addEventListener("click", function (e) {

  e.preventDefault();
  const email = emailField.value;
  const fullNameValue = fullName.value;

  if (fullNameValue === "") {
    nameMsg.innerHTML = "Full Name cannot be empty";
    validName.style.display = "none";
    errorName.style.display = "block";

  } else {
    nameMsg.innerHTML = "Valid Full Name";
    validName.style.display = "block";
    errorName.style.display = "none";

  }

  if (validateEmail(email)) {

    emailMsg.innerHTML = "Email is valid";
    validEmail.style.display = "block";
    errorEmail.style.display = "none";
  } else {
    emailMsg.innerHTML = "Email is not valid";
    errorEmail.style.display = "block";
    validEmail.style.display = "none";
  }
});

const clearInput = function () {
  formInput.value = "";
}

function validateEmail(email) {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}


