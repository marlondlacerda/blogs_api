module.exports = (err, req, res, next) => {
  const errorMap = {
    invalid: 400,
    notFound: 404,
    unauthorized: 401,
    invalidToken: 401,
    conflict: 409,
  };
  
  if (err.message === 'invalid token' || err.message === 'jwt malformed') {
    return res.status(errorMap.invalidToken).json({
      message: 'Expired or invalid token',
    });
  }

  const status = errorMap[err.code];

  if (!status) return next(err);

  res.status(status).json({ message: err.message });
};
