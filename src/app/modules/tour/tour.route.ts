import { Router } from "express";
import { checkAuth } from "../../middlewares/checkAuth";
import { Role } from "../user/user.interface";
import { validateRequest } from "../../middlewares/validateRequest";
import {
  createTourTypeZodSchema,
  createTourZodSchema,
  updateTourZodSchema,
} from "./tour.validation";
import { TourController } from "./tour.controller";

export const tourRouter = Router();

//----------- tour type -----------
tourRouter.get("/tour-types", TourController.getAllTourType);

tourRouter.post(
  "/create-tour-type",
  checkAuth(Role.ADMIN, Role.SUPER_ADMIN),
  validateRequest(createTourTypeZodSchema),
  TourController.createTourType
);

tourRouter.patch(
  "/tour-types/:id",
  checkAuth(Role.ADMIN, Role.SUPER_ADMIN),
  TourController.updateTourType
);

tourRouter.delete(
  "/tour-types/:id",
  checkAuth(Role.ADMIN, Role.SUPER_ADMIN),
  TourController.deleteTourType
);

//----------- tour ----------------
tourRouter.get("/", TourController.getAllTours);

tourRouter.post(
  "/create",
  checkAuth(Role.ADMIN, Role.SUPER_ADMIN),
  validateRequest(createTourZodSchema),
  TourController.createTour
);

tourRouter.patch(
  "/:id",
  checkAuth(Role.ADMIN, Role.SUPER_ADMIN),
  validateRequest(updateTourZodSchema),
  TourController.updateTour
);

tourRouter.delete(
  "/:id",
  checkAuth(Role.ADMIN, Role.SUPER_ADMIN),
  TourController.deleteTour
);
