import { getUsersFromLocalStorage } from "./storage.js";

export function isDuplicateUser(name, email) {
  const users = getUsersFromLocalStorage();
  const isNameDuplicate = users.some(
    (user) => user.name.toLowerCase() === name.toLowerCase()
  );
  const isEmailDuplicate = users.some((user) => user.email === email);
  return { isNameDuplicate, isEmailDuplicate };
}
