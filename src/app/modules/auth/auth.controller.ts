import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import httpStatus from "http-status-codes";
import { AuthServices } from "./auth.services";

const credentialsLogin = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const loggedUser = await AuthServices.credentialsLogin(req.body);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "User Login Successfull",
      data: loggedUser,
    });
  }
);

export const AuthController = {
  credentialsLogin,
};
