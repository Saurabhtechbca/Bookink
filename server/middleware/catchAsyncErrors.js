// Utility to wrap async route handlers and forward errors to Express error middleware
export const catchAsyncErrors = (theFunc) => {
  return async (req, res, next) => {
    try {
      await theFunc(req, res, next);
    } catch (err) {
      next(err); // Pass error to global error handler
    }
  };
};

export default catchAsyncErrors;