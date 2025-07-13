import { Router } from "express";
import { userRouter } from "../modules/user/user.route";

export const appRouter = Router();

const moduleRoutes = [
  {
    path: "/user",
    route: userRouter,
  },
];

moduleRoutes.forEach((route) => {
  appRouter.use(route.path, route.route);
});
