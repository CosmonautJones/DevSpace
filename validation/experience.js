const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateExperienceInput(data) {
  let errors = {};

  // To ensure that the data is there or at least an empty string for Validator
  data.title = !isEmpty(data.title) ? data.title : "";
  data.company = !isEmpty(data.company) ? data.company : "";
  data.from = !isEmpty(data.from) ? data.from : "";

  // Chekcing if Title field has input
  if (Validator.isEmpty(data.title)) {
    errors.title = "Job title field is required";
  }

  // Chekcing if Company field has input
  if (Validator.isEmpty(data.company)) {
    errors.company = "Company field is required";
  }

  // Chekcing if Start Date field has input
  if (Validator.isEmpty(data.from)) {
    errors.from = "Start date is required";
  }

  return {
    errors: errors,
    isValid: isEmpty(errors)
  };
};
