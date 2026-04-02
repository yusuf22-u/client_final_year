export const validateEmail = (email) => {
  if (!email.trim()) return "Email is required";

  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!regex.test(email)) {
    return "Invalid email format";
  }

  return "";
};

export const validatePassword = (password) => {
  if (!password.trim()) return "Password is required";

  // if (password.length < 6) {
  //   return "Password must be at least 6 characters";
  // }

  return "";
};