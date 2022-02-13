const joi = require('joi');

module.exports = (err, req, res, next) => {
  // const errorMap = {
  //   'string.min': 400,
  //   'any.required': 400,
  //   'string.email': 400,
  // };

  if (!joi.isError(err)) return next(err);

  // const { type } = err.details[0];

  // const status = errorMap[type];

  res.status(400).json({ message: err.message });
};
