import { Error } from "mongoose";
import { TGenericErrorResponse } from "../../interfaces/error.types";

export const handleCastError = (err: Error.CastError): TGenericErrorResponse => {
  return {
    statusCode: 400,
    message: `Invalid ${err.path}: ${err.value}. Please provide a valid ${err.kind}`,
  };
};
