export function checkPasswordStrength(password) {
  const strengthIndicator = document.querySelector("#levelPassword");
  strengthIndicator.textContent = "";
  strengthIndicator.className = "";

  if (password.length < 1) return;

  const hasSymbol = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/.test(password);
  const hasNumber = /\d/.test(password);

  if (password.length < 6) {
    strengthIndicator.textContent = "Mot de passe faible";
    strengthIndicator.className = "strength-weak";
    return "weak";
  }

  if (password.length > 6 && (hasSymbol || hasNumber)) {
    strengthIndicator.textContent = "Mot de passe moyen";
    strengthIndicator.className = "strength-medium";
    return "medium";
  }

  if (password.length > 9 && hasSymbol && hasNumber) {
    strengthIndicator.textContent = "Mot de passe fort";
    strengthIndicator.className = "strength-strong";
    return "strong";
  }

  return "weak";
}
