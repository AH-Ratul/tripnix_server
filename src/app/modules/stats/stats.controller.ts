import { Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { StatsService } from "./stats.service";
import { sendResponse } from "../../utils/sendResponse";

const getBookingStats = catchAsync(async (req: Request, res: Response) => {
  const result = await StatsService.getBookingStats();

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Booking Stats Retrieved Successfully",
    data: result,
  });
});

const getPaymentStats = catchAsync(async (req: Request, res: Response) => {
  const result = await StatsService.getPaymentStats();

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Payment Stats Retrieved Successfully",
    data: result,
  });
});

const getUserStats = catchAsync(async (req: Request, res: Response) => {
  const result = await StatsService.getUserStats();

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "User Stats Retrieved Successfully",
    data: result,
  });
});

const getTourStats = catchAsync(async (req: Request, res: Response) => {
  const result = await StatsService.getTourStats();

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Tour Stats Retrieved Successfully",
    data: result,
  });
});

export const StatsController = {
  getBookingStats,
  getPaymentStats,
  getUserStats,
  getTourStats,
};
