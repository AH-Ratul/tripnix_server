import { config } from "../config";
import { IUser } from "../modules/user/user.interface";
import { generateToken } from "./jwt";

export const createUserTokens = (user: Partial<IUser>) => {
  const jwtPaylaod = {
    useId: user._id,
    email: user.email,
    role: user.role,
  };

  const accessToken = generateToken(
    jwtPaylaod as unknown as string,
    config.JWT_SECRET,
    config.JWT_EXPIRES
  );

  const refreshToken = generateToken(
    jwtPaylaod as unknown as string,
    config.JWT_REFRESH_SECRET,
    config.JWT_REFRESH_EXPIRES
  );

  return {
    accessToken,
    refreshToken,
  };
};
