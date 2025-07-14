import { config } from "../config";
import { IAuthProvider, IUser, Role } from "../modules/user/user.interface";
import { User } from "../modules/user/user.model";
import bcrypt from "bcryptjs";

export const seedSuperAdmin = async () => {
  try {
    const isSuperAdmin = await User.findOne({
      email: config.SUPER_ADMIN_EMAIL,
    });

    if (isSuperAdmin) {
      console.log("Super Admin already exists!!");
      return;
    }

    const hashedPassword = await bcrypt.hash(
      config.SUPER_ADMIN_PASSWORD,
      Number(config.SALT)
    );

    const authProvider: IAuthProvider = {
      provider: "credentials",
      providerId: config.SUPER_ADMIN_EMAIL,
    };

    const payload: IUser = {
      name: "Super Admin",
      role: Role.SUPER_ADMIN,
      email: config.SUPER_ADMIN_EMAIL,
      password: hashedPassword,
      isVerified: true,
      auths: [authProvider],
    };

    const superAdmin = await User.create(payload);

    if (superAdmin) {
      console.log("Super Admin Created");
    }
  } catch (error) {
    console.log("super error", error);
  }
};
