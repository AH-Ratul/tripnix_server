import { JwtPayload } from "jsonwebtoken";
import AppError from "../errorHelpers/AppError";
import { config } from "../config";
import { verifyToken } from "../utils/jwt";
import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status-codes";
import { User } from "../modules/user/user.model";
import { IsActive } from "../modules/user/user.interface";

export const checkAuth =
  (...authRoles: string[]) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const accessToken = req.headers.authorization;

      if (!accessToken) {
        throw new AppError(403, "No Token Recieved");
      }

      // verify the token
      const verifiedToken = verifyToken(
        accessToken,
        config.JWT_SECRET
      ) as JwtPayload;

      const isUserExist = await User.findOne({
        email: verifiedToken.email,
      });

      if (!isUserExist) {
        throw new AppError(httpStatus.BAD_REQUEST, "User does not Exists");
      }

      if (
        isUserExist.isActive === IsActive.BLOCKED ||
        isUserExist.isActive === IsActive.INACTIVE
      ) {
        throw new AppError(
          httpStatus.BAD_REQUEST,
          `User is ${isUserExist.isActive}`
        );
      }

      if (isUserExist.isDeleted === true) {
        throw new AppError(httpStatus.BAD_REQUEST, "User is Deleted");
      }

      if (!authRoles.includes(verifiedToken.role)) {
        throw new AppError(403, "You are not permitted to access the route");
      }

      req.user = verifiedToken;
      next();
    } catch (error) {
      console.log("jwt erro", error);
      next(error);
    }
  };
