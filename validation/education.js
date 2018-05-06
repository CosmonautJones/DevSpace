const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateEducationInput(data) {
  let errors = {};

  // To ensure that the data is there or at least an empty string for Validator
  data.school = !isEmpty(data.school) ? data.school : "";
  data.degree = !isEmpty(data.degree) ? data.degree : "";
  data.fieldofstudy = !isEmpty(data.fieldofstudy) ? data.fieldofstudy : "";
  data.from = !isEmpty(data.from) ? data.from : "";

  // Chekcing if School Name field has input
  if (Validator.isEmpty(data.school)) {
    errors.school = "School Name field is required";
  }

  // Chekcing if Company field has input
  if (Validator.isEmpty(data.degree)) {
    errors.degree = "Degree field is required";
  }
  
  // Chekcing if Start Date field has input
  if (Validator.isEmpty(data.fieldofstudy)) {
    errors.fieldofstudy = "Field of Study is required";
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
