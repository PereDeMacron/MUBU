export const isAuthenticated = () => {
  return localStorage.getItem("isLoggedIn") === "true";
};
