import { Router } from "express";
import { BookingController } from "./booking.controller";
import { checkAuth } from "../../middlewares/checkAuth";
import { Role } from "../user/user.interface";
import { validateRequest } from "../../middlewares/validateRequest";
import {
  createBookingZodSchema,
  updateBookingZodSchema,
} from "./booking.validation";

export const bookingRouter = Router();

bookingRouter.post(
  "/",
  checkAuth(Role.ADMIN, Role.SUPER_ADMIN),
  validateRequest(createBookingZodSchema),
  BookingController.createBooking
);

bookingRouter.get(
  "/",
  checkAuth(Role.ADMIN, Role.SUPER_ADMIN),
  BookingController.getAllBookings
);

bookingRouter.get(
  "/my-bookings",
  checkAuth(...Object.values(Role)),
  BookingController.getUserBooking
);

bookingRouter.get(
  "/:bookingId",
  checkAuth(...Object.values(Role)),
  BookingController.getSingleBooking
);

bookingRouter.patch(
  "/:bookingId/status",
  checkAuth(...Object.values(Role)),
  validateRequest(updateBookingZodSchema),
  BookingController.updateBookingStatus
);
