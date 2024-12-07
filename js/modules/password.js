export function checkPasswordStrength(password) {
  const minLength = 6;
  const strongLength = 9;
  const hasSymbol = /[!@#$%^&*(),.?":{}|<>]/.test(password);
  const hasNumber = /\d/.test(password);
  const hasLetter = /[a-zA-Z]/.test(password);

  if (password.length >= strongLength && hasSymbol && hasNumber && hasLetter) {
    return "fort";
  } else if (
    password.length > minLength &&
    (hasSymbol || hasNumber) &&
    hasLetter
  ) {
    return "moyen";
  } else {
    return "faible";
  }
}
