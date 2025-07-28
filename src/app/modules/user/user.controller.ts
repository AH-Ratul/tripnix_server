import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status-codes";
import { UserServices } from "./user.service";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { JwtPayload } from "jsonwebtoken";

const createUser = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const user = await UserServices.createUser(req.body);

    sendResponse(res, {
      statusCode: httpStatus.CREATED,
      success: true,
      message: "User Created Successfully",
      data: user,
    });
  }
);

const updateUser = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.params.id;
    const verifiedToken = req.user as JwtPayload;
    const payload = req.body;

    const updatedUser = await UserServices.updateUser(
      userId,
      payload,
      verifiedToken
    );

    sendResponse(res, {
      statusCode: httpStatus.CREATED,
      success: true,
      message: "User Updated Successfully",
      data: updatedUser,
    });
  }
);

const gettAllUsers = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const query = req.query;
    const result = await UserServices.getAllUsers(
      query as Record<string, string>
    );

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Users Retrieved Successfully",
      meta: result.meta,
      data: result.data,
    });
  }
);

const getSingleUser = catchAsync(async (req: Request, res: Response) => {
  const result = await UserServices.getSingleUser(req.params.id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User Retrieved Successfully",
    data: result,
  });
});

export const userController = {
  createUser,
  gettAllUsers,
  getSingleUser,
  updateUser,
};
