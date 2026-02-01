export const errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;

  res.status(statusCode).json({
    code: err.code,
    message: err.message || 'Internal Server Error',
  });
};
