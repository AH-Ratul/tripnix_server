import { Router } from "express";
import { PaymentController } from "./payment.controller";
import { checkAuth } from "../../middlewares/checkAuth";
import { Role } from "../user/user.interface";

export const paymentRouter = Router();

paymentRouter.get(
  "/:id",
  checkAuth(...Object.values(Role)),
  PaymentController.getPayment
);

paymentRouter.post("/init-payment/:bookingId", PaymentController.initPayment);
paymentRouter.post("/success", PaymentController.successPayment);
paymentRouter.post("/fail", PaymentController.failPayment);
paymentRouter.post("/cancel", PaymentController.cancelPayment);
paymentRouter.post("/validate-payment", PaymentController.validatePayment);
paymentRouter.get(
  "/invoice/:paymentId",
  checkAuth(...Object.values(Role)),
  PaymentController.getInvoiceURL
);
