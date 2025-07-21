import { TGenericErrorResponse } from "../../interfaces/error.types";

export const handleDuplicateError = (err: any): TGenericErrorResponse => {
  const value = err.errorResponse.errmsg.match(/"([^"]*)"/)[1];

  return {
    statusCode: 400,
    message: `${value} already exists!!`,
  };
};
