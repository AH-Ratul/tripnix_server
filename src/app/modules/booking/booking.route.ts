import { Router } from "express";
import { BookingController } from "./booking.controller";

export const bookingRouter = Router();

bookingRouter.post("/create", BookingController.createBooking);

bookingRouter.get("/", BookingController.getAllBookings);
