import { NextFunction, Request, Response, Router } from "express";
import { AuthController } from "./auth.controller";
import { checkAuth } from "../../middlewares/checkAuth";
import { Role } from "../user/user.interface";
import passport from "passport";
import { User } from "../user/user.model";
import { config } from "../../config";

export const authRouter = Router();

authRouter.post("/login", AuthController.credentialsLogin);
authRouter.post("/refresh-token", AuthController.getNewAccessToken);
authRouter.post("/logout", AuthController.logout);
authRouter.post(
  "/reset-password",
  checkAuth(...Object.values(Role)),
  AuthController.resetPassword
);

authRouter.post(
  "/change-password",
  checkAuth(...Object.values(Role)),
  AuthController.changePassword
);

authRouter.post(
  "/set-password",
  checkAuth(...Object.values(Role)),
  AuthController.setPassword
);

authRouter.post("/forget-password", AuthController.forgetPassword);

authRouter.get("/google", (req: Request, res: Response, next: NextFunction) => {
  const redirect = req.query.redirect || "/";
  passport.authenticate("google", {
    scope: ["profile", "email"],
    state: redirect as string,
  })(req, res, next);
});

authRouter.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: `${config.CLIENT_URL}/login?error=There is some issue with your account. Please contact our support team.`,
  }),
  AuthController.googleCallbackController
);

passport.serializeUser((user: any, done: (err: any, id?: unknown) => void) => {
  done(null, user._id);
});

passport.deserializeUser(async (id: string, done: any) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (error) {
    done(error);
  }
});
