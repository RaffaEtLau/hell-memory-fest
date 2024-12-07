import {
  nameValidator,
  emailValidator,
  passwordValidator,
  checkPasswordValidator,
} from "./validator.js";

import { saveToLocalStorage } from "./storage.js";

import { displayFieldError, clearFieldErrors } from "./errorDisplay.js";

import { checkPasswordStrength } from "./password.js";

import { isDuplicateUser } from "./duplicate.js";

async function handleSubmit(event) {
  event.preventDefault();
  clearFieldErrors();

  const formData = {
    name: document.getElementById("nameUser").value,
    email: document.getElementById("emailUser").value,
    password: document.getElementById("passwordUser").value,
    checkPassword: document.getElementById("checkPasswordUser").value,
  };

  const levelPassword = document.querySelector("#levelPassword");
  let hasError = false;

  const { isNameDuplicate, isEmailDuplicate } = await isDuplicateUser(
    formData.name,
    formData.email
  );
  console.log("Duplication Check", isNameDuplicate, isEmailDuplicate);

  if (isNameDuplicate) {
    displayFieldError("name", "Ce nom de démon est déjà utilisé");
    hasError = true;
  }

  if (isEmailDuplicate) {
    displayFieldError("email", "Cet email est déjà utilisé");
    hasError = true;
  }

  if (!nameValidator(formData.name)) {
    displayFieldError(
      "name",
      "Le nom de démon doit contenir au moins 3 caractères"
    );
    hasError = true;
  }

  if (!emailValidator(formData.email)) {
    displayFieldError("email", "L'adresse email est invalide");
    hasError = true;
  }

  if (!passwordValidator(formData.password)) {
    displayFieldError(
      "password",
      "Le mot de passe doit contenir au moins 6 caractères, un caractère spécial, un chiffre et des lettres"
    );
    hasError = true;
  }

  if (!checkPasswordValidator(formData.checkPassword, formData.password)) {
    displayFieldError(
      "checkPassword",
      "Les mots de passe ne correspondent pas"
    );
    hasError = true;
  }

  console.log("Has Error", hasError);

  if (hasError) {
    return;
  }

  saveToLocalStorage(formData);
  alert("Bienvenue aux enfers !");
  event.currentTarget.reset();
  levelPassword.textContent = "";
}

document.getElementById("nameUser").addEventListener("input", async (event) => {
  const name = event.target.value;
  const { isNameDuplicate } = await isDuplicateUser(
    name,
    document.getElementById("emailUser").value
  );
  console.log("Name Input Check", isNameDuplicate);

  if (isNameDuplicate) {
    displayFieldError("name", "Ce nom de démon est déjà utilisé");
  } else {
    clearFieldErrors();
  }
});

document
  .getElementById("emailUser")
  .addEventListener("input", async (event) => {
    const email = event.target.value;
    const { isEmailDuplicate } = await isDuplicateUser(
      document.getElementById("nameUser").value,
      email
    );
    console.log("Email Input Check", isEmailDuplicate);

    if (isEmailDuplicate) {
      displayFieldError("email", "Cet email est déjà utilisé");
    } else {
      clearFieldErrors();
    }
  });

document.getElementById("passwordUser").addEventListener("input", (event) => {
  const password = event.target.value;
  const strength = checkPasswordStrength(password);

  const levelPassword = document.querySelector("#levelPassword");
  levelPassword.textContent = `Force du mot de passe : ${strength}`;

  if (strength === "faible") {
    levelPassword.style.color = "red";
  } else if (strength === "moyen") {
    levelPassword.style.color = "orange";
  } else {
    levelPassword.style.color = "green";
  }
});


document.getElementById("hellUser").addEventListener("submit", handleSubmit);
