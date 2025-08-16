import { Router } from "express";
import { userController } from "./user.controller";
import { validateRequest } from "../../middlewares/validateRequest";
import { createUserZodSchema, updateUserZodSchema } from "./user.validation";
import { checkAuth } from "../../middlewares/checkAuth";
import { Role } from "./user.interface";

export const userRouter = Router();

userRouter.post(
  "/register",
  validateRequest(createUserZodSchema),
  userController.createUser
);

userRouter.get(
  "/all-users",
  checkAuth(Role.ADMIN, Role.SUPER_ADMIN),
  userController.gettAllUsers
);

userRouter.get("/me", checkAuth(...Object.values(Role)), userController.getMe);

userRouter.get(
  "/:id",
  checkAuth(Role.ADMIN, Role.SUPER_ADMIN),
  userController.getSingleUser
);

userRouter.patch(
  "/:id",
  validateRequest(updateUserZodSchema),
  checkAuth(...Object.values(Role)),
  userController.updateUser
);
