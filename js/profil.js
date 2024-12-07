import { getUsersFromLocalStorage } from "./modules/storage.js";

document.addEventListener("DOMContentLoaded", () => {
  const currentUserEmail = localStorage.getItem("currentUserEmail");
  const users = getUsersFromLocalStorage();
  const currentUser = users.find((user) => user.email === currentUserEmail);

  if (currentUser) {
    document.getElementById("nomUser").value = currentUser.name;
    document.getElementById("emailUser").value = currentUser.email;
    const profilImageElement = document.getElementById("profilImage");

    if (currentUser.profilPicture) {
      profilImageElement.src = currentUser.profilPicture;
    } else {
      profilImageElement.src = "./img/facearriere.png";
    }

    if (currentUser.memoryChoice) {
      document.getElementById("memoryChoice").value = currentUser.memoryChoice;
    }

    if (currentUser.sizeChoice) {
      document.getElementById("sizeChoice").value = currentUser.sizeChoice;
    }

    document.getElementById("profilUser").style.display = "block";
  } else {
    const errorContainer = document.getElementById("errorContainer");
    errorContainer.textContent =
      "Aucun utilisateur connecté. Veuillez vous connecter.";
    errorContainer.style.display = "block";

    const loginButton = document.createElement("button");
    loginButton.textContent = "Se connecter";
    loginButton.onclick = () => {
      window.location.href = "connexion.html";
    };
    errorContainer.appendChild(loginButton);
  }

  const profileForm = document.getElementById("profilUser");
  profileForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const memoryChoice = document.getElementById("memoryChoice").value;
    const sizeChoice = document.getElementById("sizeChoice").value;
    const profilePictureInput = document.getElementById("profilPicture");

    const users = getUsersFromLocalStorage();
    const currentUserEmail = localStorage.getItem("currentUserEmail");

    const currentUser = users.find((user) => user.email === currentUserEmail);

    if (currentUser) {
      currentUser.memoryChoice = memoryChoice;
      currentUser.sizeChoice = sizeChoice;
      localStorage.setItem("hellUsers", JSON.stringify(users));
      alert("Options enregistrées !");

      if (
        profilePictureInput &&
        profilePictureInput.files &&
        profilePictureInput.files[0]
      ) {
        const reader = new FileReader();
        reader.onload = function (e) {
          currentUser.profilPicture = e.target.result;
          document.getElementById("profilImage").src =
            currentUser.profilPicture;
          localStorage.setItem("hellUsers", JSON.stringify(users));
          alert("Options enregistrées !");
        };
        reader.readAsDataURL(profilePictureInput.files[0]);
      } else {
        localStorage.setItem("hellUsers", JSON.stringify(users));
        alert("Options enregistrées !");
      }
    }
  });
});
