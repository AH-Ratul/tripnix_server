import { Router } from "express";
import { userController } from "./user.controller";
import { validateRequest } from "../../middlewares/validateRequest";
import { createUserZodSchema } from "./user.validation";
import { checkAuth } from "../../middlewares/checkAuth";

export const userRouter = Router();

userRouter.post(
  "/register",
  validateRequest(createUserZodSchema),
  userController.createUser
);
userRouter.get(
  "/all-users",
  checkAuth("ADMIN", "SUPER_ADMIN"),
  userController.gettAllUsers
);
