class ErrorHandler extends Error{
    constructor(message, statusCode){
        super(message);
        this.statusCode = statusCode; 
    }
}

export const errorMiddleware = (error, req, res, next)=>{
  err.message = error.message || "Internal Server error";
  err.statusCode = error.statusCode || 500; 

  if(err.vode === 11000){
    const statusCode = 400;
    const message = `Duplicate Field Value Entered`;
    err = new ErrorHandler(message, err.statusCode);
  }

  if(err.name === "JsonWebTokenError"){
    const statusCode = 400;
    const message = `Json Web Token is invalid. Try again.`;
    err = new ErrorHandler(message, err.statusCode);
  }

  if(err.name === "TokenExpiredError"){
    const statusCode = 400;
    const message = `Json Web Token is invalid. Try again.`;
    err = new ErrorHandler(message, err.statusCode);
  }

  if(err.name === "CastError"){
    const statusCode = 400;
    const message = `Resource not found. Invalid: ${err.path}`;
    err = new ErrorHandler(message, err.statusCode); 
  }

["name is required.", "Email is required.", "Password is required."]
"Name is required. Email is required. Password is rquired"
 
  const errorMessage = err.errors ? Object.values(err.errors).map(error => error.message).join(" ") : err.message;
  

return res.status (err,statusCode).json({
    success: false,
    message: errorMessages
 });
};

export default ErrorHandler;
