import { Router } from "express";
import { PaymentController } from "./payment.controller";

export const paymentRouter = Router();

paymentRouter.post("/init-payment/:bookingId", PaymentController.initPayment);
paymentRouter.post("/success", PaymentController.successPayment);
paymentRouter.post("/fail", PaymentController.failPayment);
paymentRouter.post("/cancel", PaymentController.cancelPayment);
