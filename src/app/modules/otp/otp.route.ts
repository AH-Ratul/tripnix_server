import { Router } from "express";
import { OtpController } from "./otp.controller";

export const otpRoute = Router();

otpRoute.post("/send", OtpController.sendOtp);
otpRoute.post("/verify", OtpController.verifyOtp);
