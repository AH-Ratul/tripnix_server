import { Router } from "express";
import { AuthController } from "./auth.controller";
import { checkAuth } from "../../middlewares/checkAuth";
import { Role } from "../user/user.interface";

export const authRouter = Router();

authRouter.post("/login", AuthController.credentialsLogin);
authRouter.post("/refresh-token", AuthController.getNewAccessToken);
authRouter.post("/logout", AuthController.logout);
authRouter.post(
  "/reset-password",
  checkAuth(...Object.values(Role)),
  AuthController.resetPassword
);
