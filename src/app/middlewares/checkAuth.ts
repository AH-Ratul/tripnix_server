import { JwtPayload } from "jsonwebtoken";
import AppError from "../errorHelpers/AppError";
import { config } from "../config";
import { verifyToken } from "../utils/jwt";
import { NextFunction, Request, Response } from "express";

export const checkAuth =
  (...authRoles: string[]) =>
  (req: Request, res: Response, next: NextFunction) => {
    try {
      const accessToken = req.headers.authorization;

      if (!accessToken) {
        throw new AppError(403, "No Token Recieved");
      }

      const verifiedToken = verifyToken(
        accessToken,
        config.JWT_SECRET
      ) as JwtPayload;

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
