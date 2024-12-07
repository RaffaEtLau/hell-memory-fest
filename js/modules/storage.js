export function saveToLocalStorage(userData) {
  const users = JSON.parse(localStorage.getItem("hellUsers")) ?? [];
  users.push(userData);
  localStorage.setItem("hellUsers", JSON.stringify(users));
}

export function getUsersFromLocalStorage() {
  const users = JSON.parse(localStorage.getItem("hellUsers")) ?? [];
  console.log("Users from local storage", users);
  return users;
}
