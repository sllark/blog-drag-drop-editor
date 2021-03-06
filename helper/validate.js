const { validationResult } = require("express-validator");

module.exports = (req, res, next) => {

  const validation = validationResult(req);
  if (!validation.isEmpty()) {
    let errors = validation.array();

    const error = new Error(errors[0].msg);
    error.statusCode = 422;
    error.errors = errors;
    return next(error);
  }

  next();
};
