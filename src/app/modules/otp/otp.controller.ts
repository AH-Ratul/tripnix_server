import { Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { OtpService } from "./otp.service";

const sendOtp = catchAsync(async (req: Request, res: Response) => {
  const { email, name } = req.body;

  await OtpService.sendOtp(email, name);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "OTP sent Successfully",
    data: null,
  });
});

const verifyOtp = catchAsync(async (req: Request, res: Response) => {
  const { email, otp } = req.body;

  await OtpService.verifyOtp(email, otp);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "OTP verified Successfully",
    data: null,
  });
});

export const OtpController = {
  sendOtp,
  verifyOtp,
};
