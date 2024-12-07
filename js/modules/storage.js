export function saveToLocalStorage(userData) {
  const users = JSON.parse(localStorage.getItem("hellUsers")) ?? [];
  users.push(userData);
  localStorage.setItem("hellUsers", JSON.stringify(users));
}

export function getUsersFromLocalStorage() {
  return JSON.parse(localStorage.getItem("hellUser")) ?? [];
}
