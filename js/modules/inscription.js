import {
  nameValidator,
  emailValidator,
  passwordValidator,
  checkPasswordValidator,
} from "./validator.js";

import { saveToLocalStorage } from "./storage.js";

import { displayFieldError, clearFieldErrors } from "./errorDisplay.js";

import { checkPasswordStrength } from "./password.js";

function handleSubmit(event) {
  event.preventDefault();
  clearFieldErrors();

  const formData = {
    name: document.getElementById("nameUser").value,
    email: document.getElementById("emailUser").value,
    password: document.getElementById("passwordUser").value,
    checkPassword: document.getElementById("checkPasswordUser").value,
  };

  console.log(formData);

  let hasError = false;

  if (!nameValidator(formData.name)) {
    displayFieldError("name", "Nom invalide");
    hasError = true;
  }

  if (!emailValidator(formData.email)) {
    displayFieldError("email", "Email invalide");
    hasError = true;
  }

  if (!passwordValidator(formData.password)) {
    displayFieldError(
      "password",
      "Le mot de passe doit contenir au moins 6 caractères, un caractère spécial, un chiffre et des lettres"
    );
    hasError = true;
  }

  if (!checkPasswordValidator(formData.checkPassword)) {
    displayFieldError(
      "checkPassword",
      "Les mots de passe ne sont pas identiques"
    );
    hasError = true;
  }

  if (hasError) {
    return;
  }

  saveToLocalStorage(formData);
  alert("Entrée aux enfers réussie !");
  event.currentTarget.reset();
}

document.getElementById('passwordUser').addEventListener('input', function(event) {
  const passwordInput = document.getElementById('passwordUser')
  const confirmPasswordInput = event.target
  const levelPassword = document.querySelector('#levelPassword')

  if (passwordInput.value !== confirmPasswordInput.value) {
    confirmPasswordInput.classList.add("error");
    levelPassword.textContent = "Les mots de passe ne correspondent pas";
    levelPassword.className = "strength-weak";
  } else {
    confirmPasswordInput.classList.remove("error");
    levelPassword.textContent = "";
    levelPassword.className = "";
  }
})


document.getElementById("hellUser").addEventListener("submit", handleSubmit);
