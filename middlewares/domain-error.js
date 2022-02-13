module.exports = (err, req, res, next) => {
  const errorMap = {
    conflict: 409,
    invalid: 400,
  };

  const status = errorMap[err.code];

  if (!status) return next(err);

  res.status(status).json({ message: err.message });
};