export const errorHandler = (err, req, res, next) => {
  console.error(err);

  if (err.code === 'ER_DUP_ENTRY') {
    return res.status(409).json({
      message: 'Diese E-Mail ist bereits registriert!',
    });
  }

  if (err.statusCode) {
    return res.status(err.statusCode).json({
      message: err.message,
    });
  }

  res.status(500).json({
    message: 'Internal Server Error',
  });
};
