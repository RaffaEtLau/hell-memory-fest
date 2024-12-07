import { getUsersFromLocalStorage } from "./modules/storage.js";
import { displayFieldError, clearFieldErrors } from "./modules/errorDisplay.js";

function handleLogin(event) {
  event.preventDefault();
  clearFieldErrors();

  const email = document.getElementById("emailUser").value;
  const password = document.getElementById("passwordUser").value;

  const users = getUsersFromLocalStorage();
  const user = users.find((user) => user.email === email);

  if (!user) {
    displayFieldError("email", "Email inconnu");
    return;
  }

  if (user.password !== password) {
    displayFieldError("password", "Mot de passe incorrect");
    return;
  }

  if (user.password === password) {
    localStorage.setItem("currentUserEmail", email);
    alert("Connexion réussie !");
    window.location.href = "profil.html";
  }
}

document
  .getElementById("hellConnexion")
  .addEventListener("submit", handleLogin);
