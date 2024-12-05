import {
  namValidator,
  emailValidator,
  passwordValidator,
  checkPasswordValidator,
} from "./validators.js";

import { saveToLocalStorage } from "./storage.js";

import { displayFieldError, clearFieldErrors } from "./errorDisplay.js";
