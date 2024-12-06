export function nameValidator(name) {
  if (name.length >= 3) {
    return true;
  } else {
    return false;
  }
}

export function emailValidator(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export function passwordValidator(password) {
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^_&*])(?=.{6,})/;
  return passwordRegex.test(password);
}

export function checkPasswordValidator(checkPassword, password) {
  if (checkPassword === password) {
    return false;
  } else {
    return true;
  }
}
