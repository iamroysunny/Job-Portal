export const validateEmail = (email) => {
  if (!email) return "Email required";
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email) ? "" : "Invalid email";
};

export const validatePassword = (password) => {
  if (!password) return "Password required";
  if (password.length < 6) return "Min 6 characters";
  return "";
};

export const getInitials = (name) => {
  return name
  .split(" ")
  .map((word) => word.charAt(0))
  .join(" ")
  .toUpeerCase()
  .slice(0, 2);
};