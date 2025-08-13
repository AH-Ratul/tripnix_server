import AppError from "../../errorHelpers/AppError";
import { User } from "../user/user.model";
import httpStatus from "http-status-codes";
import bcrypt from "bcryptjs";
import { createNewAccessTokenWithRefreshToken } from "../../utils/userTokens";
import { JwtPayload } from "jsonwebtoken";
import { config } from "../../config";
import { IAuthProvider } from "../user/user.interface";

const getNewAccessToken = async (refreshToken: string) => {
  const newAccessToken = await createNewAccessTokenWithRefreshToken(
    refreshToken
  );

  return {
    accessToken: newAccessToken,
  };
};

const resetPassword = async (
  newPassword: string,
  oldPassword: string,
  decodedToken: JwtPayload
) => {
  const user = await User.findById(decodedToken.userId);

  const isOldPasswordMatch = await bcrypt.compare(
    oldPassword,
    user!.password as string
  );

  if (!isOldPasswordMatch) {
    throw new AppError(httpStatus.UNAUTHORIZED, "Old Password does not Match");
  }

  user!.password = await bcrypt.hash(
    newPassword as string,
    Number(config.SALT)
  );

  user!.save();
};

const changePassword = async (
  newPassword: string,
  oldPassword: string,
  decodedToken: JwtPayload
) => {
  const user = await User.findById(decodedToken.userId);

  const isOldPasswordMatch = await bcrypt.compare(
    oldPassword,
    user!.password as string
  );

  if (!isOldPasswordMatch) {
    throw new AppError(httpStatus.UNAUTHORIZED, "Old Password does not Match");
  }

  user!.password = await bcrypt.hash(
    newPassword as string,
    Number(config.SALT)
  );

  user!.save();
};

const setPassword = async (userId: string, plainPassword: string) => {
  const user = await User.findById(userId);

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, "User not found");
  }

  if (
    user.password &&
    user.auths.some((providerObj) => providerObj.provider === "google")
  ) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      "You have already set you password. Now you can change the password from your profile"
    );
  }

  const hashedPassword = await bcrypt.hash(plainPassword, Number(config.SALT));

  const credentialsProvider: IAuthProvider = {
    provider: "credentials",
    providerId: user.email,
  };

  const auths: IAuthProvider[] = [...user.auths, credentialsProvider];

  user.password = hashedPassword;

  user.auths = auths;

  await user.save();
};

export const AuthServices = {
  getNewAccessToken,
  resetPassword,
  changePassword,
  setPassword,
};
