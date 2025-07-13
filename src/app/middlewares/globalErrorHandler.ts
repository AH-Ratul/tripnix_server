import { ErrorRequestHandler, NextFunction, Request, Response } from "express";
import config from "../config";
import AppError from "../errorHelpers/AppError";

export const globalErrorHandler: ErrorRequestHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let statusCode = err.statusCode || 500;
  let message = err.message || "Something went wrong!!";

  if (err instanceof AppError) {
    statusCode = err?.statusCode;
    message = err?.message;
  } else if (err instanceof Error) {
    statusCode = 500;
    message = err?.message;
  }

  res.status(statusCode).json({
    success: false,
    message,
    err,
    stack: config.NODE_ENV === "development" ? err.stack : null,
  });
};
