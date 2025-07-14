import AppError from "../../errorHelpers/AppError";
import { IUser } from "../user/user.interface";
import { User } from "../user/user.model";
import httpStatus from "http-status-codes";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { generateToken } from "../../utils/jwt";
import { config } from "../../config";

const credentialsLogin = async (payload: Partial<IUser>) => {
  const { email, password } = payload;

  const isUserExist = await User.findOne({ email });

  if (!isUserExist) {
    throw new AppError(httpStatus.BAD_REQUEST, "Email Doesn't Exist");
  }

  const isPasswordMatched = await bcrypt.compare(
    password as string,
    isUserExist.password as string
  );

  if (!isPasswordMatched) {
    throw new AppError(httpStatus.BAD_REQUEST, "Incorrect Password");
  }

  const jwtPaylaod = {
    useId: isUserExist._id,
    email: isUserExist.email,
    role: isUserExist.role,
  };

  const accessToken = generateToken(
    jwtPaylaod as unknown as string,
    config.JWT_SECRET,
    config.JWT_EXPIRES
  );

  return {
    accessToken,
  };
};

export const AuthServices = {
  credentialsLogin,
};
