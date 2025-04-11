class errorHandler extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
  }
}


export const errorMiddleware = (err, req, res, next) => {
  err.message = err.message || "Internal Server Error";
  err.statusCode = err.statusCode || 500;

 
  if (err.code === 11000) {
    err = new errorHandler("Duplicate field value entered", 400);
  }

  if (err.name === "JsonWebTokenError") {
    err = new errorHandler("JSON Web Token is invalid. Try again.", 400);
  }

  if (err.name === "TokenExpiredError") {
    err = new errorHandler("JSON Web Token has expired. Try again.", 400);
  }

 
  if (err.name === "CastError") {
    err = new errorHandler(`Resource not found. Invalid: ${err.path}, 400`);
  }

  
  const errorMessage =
    err.errors && typeof err.errors === "object"
      ? Object.values(err.errors)
          .map((error) => error.message)
          .join(" ")
      : err.message;

  return res.status(err.statusCode).json({
    success: false,
    message: errorMessage,
  });
};

export default errorHandler;