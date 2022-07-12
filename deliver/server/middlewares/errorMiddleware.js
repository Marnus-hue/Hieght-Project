const { StatusCodes } = require('http-status-codes');

const errorHandler = (err, req, res, next) => {
  const defaultError = {
    statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
    msg: err.message || 'There was an error, try again later',
  };
  //  validation Error(empty fields)
  if (err.name === 'ValidationError') {
    (defaultError.statusCode = StatusCodes.BAD_REQUEST),
      (defaultError.msg = Object.values(err.errors)
        .map((item) => item.message)
        .join(','));
  }

  res.status(defaultError.statusCode).json({
    msg: defaultError.msg,
    stack: process.env === 'production' ? '' : err.stack,
  });
};

module.exports = errorHandler;
