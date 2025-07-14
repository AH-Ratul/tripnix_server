import AppError from "../../errorHelpers/AppError";
import { IAuthProvider, IUser, Role } from "./user.interface";
import { User } from "./user.model";
import httpStatus from "http-status-codes";
import bcrypt from "bcryptjs";
import { config } from "../../config";
import { JwtPayload } from "jsonwebtoken";

const createUser = async (payload: Partial<IUser>) => {
  const { email, password, ...rest } = payload;

  // ensure user exists or not
  const isUserExists = await User.findOne({ email });

  if (isUserExists) {
    throw new AppError(httpStatus.BAD_REQUEST, "Email Already Exist");
  }

  // hash the password before create
  const hashedPassword = await bcrypt.hash(
    password as string,
    Number(config.SALT)
  );

  const authProvider: IAuthProvider = {
    provider: "credentials",
    providerId: email as string,
  };

  // create the user
  const user = await User.create({
    email,
    password: hashedPassword,
    auths: [authProvider],
    ...rest,
  });

  return user;
};

const updateUser = async (
  userId: string,
  payload: Partial<IUser>,
  decodedToken: JwtPayload
) => {
  // ensure user exists or not
  const isUserExists = await User.findById(userId);

  if (!isUserExists) {
    throw new AppError(httpStatus.NOT_FOUND, "User Not Found");
  }

  // if the incoming request payload includes a role change
  if (payload.role) {
    // block normal users (USER & GUIDE) from changing any roles
    if (decodedToken.role === Role.USER || decodedToken.role === Role.GUIDE) {
      throw new AppError(httpStatus.FORBIDDEN, "You are not authorized");
    }

    //prevent ADMIN from assigning the SUPER_ADMIN role
    // only SUPER_ADMIN can assign the SUPER_ADMIN role
    if (
      decodedToken.role === Role.SUPER_ADMIN &&
      decodedToken.role === Role.ADMIN
    ) {
      throw new AppError(
        httpStatus.FORBIDDEN,
        "Only SUPER_ADMIN can assign SUPER_ADMIN role"
      );
    }
  }

  // if the request tries to change the status flags
  if (payload.isActive || payload.isDeleted || payload.isVerified) {
    // block USER & GUIDE from change user status
    if (decodedToken.role === Role.USER || decodedToken.role === Role.GUIDE) {
      throw new AppError(httpStatus.FORBIDDEN, "You are not authorized");
    }
  }

  // re-hashing the updated password
  if (payload.password) {
    payload.password = await bcrypt.hash(payload.password, config.SALT);
  }

  // update the user
  const newUpdateUser = await User.findByIdAndUpdate(userId, payload, {
    new: true,
    runValidators: true,
  });

  return newUpdateUser;
};

const getAllUsers = async () => {
  const users = await User.find();

  const totalUser = await User.countDocuments();

  return {
    users,
    meta: {
      total: totalUser,
    },
  };
};

export const UserServices = {
  createUser,
  getAllUsers,
  updateUser,
};
