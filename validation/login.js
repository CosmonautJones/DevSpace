const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateLoginInput(data) {
  let errors = {};

  // To ensure that the data is there or at least an empty string for Validator
  data.email = !isEmpty(data.email) ? data.email : "";
  data.password = !isEmpty(data.password) ? data.password : "";

  // Ensures that the input is in email format
  if (!Validator.isEmail(data.email)) {
    errors.email = "Field requires valid email";
  }
  // Checking if email field has input
  if (Validator.isEmpty(data.email)) {
    errors.email = "Email field is required!";
  }
  // Chekcing if password field has input
  if (Validator.isEmpty(data.password)) {
    errors.password = "Password field is required";
  }

  return {
    errors, // es6 of errors: errors
    isValid: isEmpty(errors)
  };
};
