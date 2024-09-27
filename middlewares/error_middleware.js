// error middleware || NEXT function

const error_middleware = (err, req, res, next) => {
  console.log(err);

  const defaultError = {
    statusCode: 500,
    message: err,
  };

  // missing field error
  if (err.name == "ValidationError") {
    defaultError.statusCode = 400;
    defaultError.message = Object.values(err.errors)
      .map((item) => item.message)
      .join(",");
  }
  res.status(defaultError.statusCode).json({ message: defaultError.message });
};

export default error_middleware;
