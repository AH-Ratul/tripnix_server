import { Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { BookingService } from "./booking.service";
import { sendResponse } from "../../utils/sendResponse";
import httpStatus from "http-status-codes";
import { JwtPayload } from "jsonwebtoken";

const createBooking = catchAsync(async (req: Request, res: Response) => {
  const decodetToken = req.user as JwtPayload;

  const result = await BookingService.createBooking(
    req.body,
    decodetToken.userId
  );

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "Booking Created Successfully",
    data: result,
  });
});

const getAllBookings = catchAsync(async (req: Request, res: Response) => {
  const result = await BookingService.getAllBookings();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Bookings Retrieved Successfully",
    data: result,
  });
});

const getUserBooking = catchAsync(async (req: Request, res: Response) => {
  const result = await BookingService.getUserBooking();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User Booking Retrieved Successfully",
    data: result,
  });
});

const getSingleBooking = catchAsync(async (req: Request, res: Response) => {
  const result = await BookingService.getSingleBooking();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Booking Retireved Successfully",
    data: result,
  });
});

const updateBookingStatus = catchAsync(async (req: Request, res: Response) => {
  const result = await BookingService.updateBookingStatus();

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "Update Booking Status Successfully",
    data: result,
  });
});

export const BookingController = {
  createBooking,
  getAllBookings,
  getUserBooking,
  getSingleBooking,
  updateBookingStatus,
};
