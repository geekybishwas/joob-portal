// error middleware || NEXT function

const error_middleware = (err, req, res, next) => {
  console.log(err);
  res.status(500).send({
    succes: false,
    message: "Something went wrong",
    err,
  });
};

export default error_middleware;
