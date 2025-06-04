import { Request, Response, NextFunction } from "express";

const notFound = (req: Request, res: Response, next: NextFunction) => {
  const notFoundError = new Error(`Not Found - ${req.originalUrl}`);

  res.status(404);
  next(notFoundError);
};

// Override the default error handler in Express
const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // Check if the error has a status code, otherwise default to 500
  const statusCode = err.statusCode || 500;
  console.log(`Error: ${err.message}`);
  // Send the error response
  res.status(statusCode).json({
    status: "error",
    statusCode,
    message: err.message || "Internal Server Error",
    stack: process.env.NODE_ENV === "development" ? err.stack : undefined,
  });
};

export { notFound, errorHandler };
