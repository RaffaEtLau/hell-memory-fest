export function nameValidator(name) {
  return name.length >= 3;
}

export function emailValidator(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export function passwordValidator(password) {
  const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^_&*])(?=.{6,})/;
  return passwordRegex.test(password);
}

export function checkPasswordValidator(checkPassword, password) {
  return checkPassword === password;
}
