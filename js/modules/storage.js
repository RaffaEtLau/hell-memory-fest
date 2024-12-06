export function saveToLocalStorage(userData) {
  const users = JSON.parse(localStorage.getItem("hellUser")) ?? [];
  users.push(userData);
  localStorage.setItem("userData", JSON.stringify(users));
}
