const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validatePostInput(data) {
  let errors = {};

  // To ensure that the data is there or at least an empty string for Validator
  data.text = !isEmpty(data.text) ? data.text : "";
  
  // Checks for proper length in post
  if(!Validator.isLength(data.text, { min: 1, max: 300 })) {
    errors.text = 'Post must be between 1 and 300 characters'
  }

  // Ensures that there is an input for the post
  if (Validator.isEmpty(data.text)) {
    errors.text = 'Text field is required';
  }

  return {
    errors: errors,
    isValid: isEmpty(errors)
  };
};
