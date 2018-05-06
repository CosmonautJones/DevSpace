const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateRegisterInput(data) {
  let errors = {};

  // To ensure that the data is there or at least an empty string for Validator
  data.name = !isEmpty(data.name) ? data.name : '';
  data.email = !isEmpty(data.email) ? data.email : '';
  data.password = !isEmpty(data.password) ? data.password : '';
  data.password2 = !isEmpty(data.password2) ? data.password2 : '';  // Confirm password
  // Checking that name is at proper length
  if(!Validator.isLength(data.name, { min: 2, max: 30})) {
    errors.name = "Name must be between 2 and 30 characters";
  }
  // Checking if name field has input
  if(Validator.isEmpty(data.name)) {
    errors.name = 'Name field is required';
  }
  // Checking if email field has input
  if(Validator.isEmpty(data.email)) {
    errors.email = 'Email field is required';
  }
  // Ensures that the input is in email format
  if(!Validator.isEmail(data.email)) {
    errors.email = 'Field requires valid email';
  }
  // Chekcing if password field has input
  if(Validator.isEmpty(data.password)) {
    errors.password = 'Password field is required';
  }
  // Checking password length
  if(!Validator.isLength(data.password, { min: 6, max: 30 })) {
    errors.password = 'Password must be at least 6 characters';
  }
  //Checking if password validate field has input
  if(Validator.isEmpty(data.password2)) {
    errors.password2 = 'Confirm password field is required';
  }
  //Checks if both password and password validate field match
  if(!Validator.equals(data.password, data.password2)) {
    errors.password2 = 'Passwords must match';
  }

  return {
    errors: errors,
    isValid: isEmpty(errors)
  }
}