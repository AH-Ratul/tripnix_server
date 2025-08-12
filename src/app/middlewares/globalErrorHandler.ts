import { ErrorRequestHandler, NextFunction, Request, Response } from "express";
import { config } from "../config";
import AppError from "../errorHelpers/AppError";
import { handleCastError } from "../errorHelpers/helpers/handleCastError";
import { handleDuplicateError } from "../errorHelpers/helpers/handleDuplicateError";
import { handleValidationError } from "../errorHelpers/helpers/handleValidationError";
import { handleZodError } from "../errorHelpers/helpers/handleZodError";
import { TErrorSources } from "../interfaces/error.types";
import { deleteImageFromCloudinary } from "../config/cloudinary.config";

export const globalErrorHandler: ErrorRequestHandler = async (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (req.file) {
    await deleteImageFromCloudinary(req.file.path);
  }

  if (req.files && req.files.length) {
    const imageUrl = (req.files as Express.Multer.File[]).map(
      (file) => file.path
    );
    await Promise.all(imageUrl.map((url) => deleteImageFromCloudinary(url)));
  }

  let errorSources: TErrorSources[] = [];
  let statusCode = err.statusCode || 500;
  let message = err.message || "Something went wrong!!";

  // Duplicate error
  if (err?.code === 11000) {
    const simplifiedError = handleDuplicateError(err);

    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
  }
  // Cast error
  else if (err?.name === "CastError") {
    const simplifiedError = handleCastError(err);

    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
  } else if (err.name === "ZodError") {
    const simplifiedError = handleZodError(err);

    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
    errorSources = simplifiedError.errorSources as TErrorSources[];
  }
  // Validation error
  else if (err.name === "ValidationError") {
    const simplifiedError = handleValidationError(err);

    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
    errorSources = simplifiedError.errorSources as TErrorSources[];
  } else if (err instanceof AppError) {
    statusCode = err?.statusCode;
    message = err?.message;
  } else if (err instanceof Error) {
    statusCode = 500;
    message = err?.message;
  }
  res.status(statusCode).json({
    success: false,
    message,
    errorSources,
    err: config.NODE_ENV === "development" ? err : null,
    stack: config.NODE_ENV === "development" ? err.stack : null,
  });
};
