const validator = require("validator");
const isEmpty = require("is-empty");

module.exports = validateRegisterInput = (data) => {
  let errors = {};
  //Convert empty fields to an empty string so we can use validator functions
  data.email = !isEmpty(data.email) ? data.email : "";
  data.role = !isEmpty(data.role) ? data.role : "";
  data.password = !isEmpty(data.password) ? data.password : "";

  //Email Checks
  if (validator.isEmpty(data.email)) {
    errors.email = "Email field is required";
  } else if (!validator.isEmail(data.email)) {
    errors.email = "Email is Invalid";
  }

  if (validator.isEmpty(data.role)) {
    errors.role = "role field is required";
  }
  //Password Checks
  if (validator.isEmpty(data.password)) {
    errors.password = "Password field is required";
  }

  // Password length checks
  else if (
    !validator.isLength(data.password, {
      min: 6,
      max: 30,
    })
  ) {
    errors.password = "Password must be at least 6 characters";
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};
