const config = {
  email: {
    valid: "Invalid email format",
    required: "Email is required",
  },
  password: {
    required: "Password field is required",
    minLength: "Must have at least 8 characters",
    regex:
      "Insecure password. Password must contain at least one of simple or capital letters, numbers, and symbols",
  },
  confirmPassword: {
    required: "Password confirmation is required",
    match: "Password confirmation does not match",
  },
};

export default config;
