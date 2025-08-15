import { Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { PaymentService } from "./payment.service";
import { config } from "../../config";
import { sendResponse } from "../../utils/sendResponse";

const initPayment = catchAsync(async (req: Request, res: Response) => {
  const { bookingId } = req.params;
  const result = await PaymentService.initPayment(bookingId);

  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: "Payment done successfully",
    data: result,
  });
});

const successPayment = catchAsync(async (req: Request, res: Response) => {
  const query = req.query;
  const result = await PaymentService.successPayment(
    query as Record<string, string>
  );

  if (result?.success) {
    res.redirect(
      `${config.SSL_SUCCESS_FRONTEND_URL}?transactionId=${query.transactionId}&status=${query.status}`
    );
  }
});

const failPayment = catchAsync(async (req: Request, res: Response) => {
  const query = req.query;
  const result = await PaymentService.failPayment(
    query as Record<string, string>
  );

  if (!result.success) {
    res.redirect(
      `${config.SSL_FAIL_FRONTEND_URL}?transactionId=${query.transactionId}&status=${query.status}`
    );
  }
});

const cancelPayment = catchAsync(async (req: Request, res: Response) => {
  const query = req.query;
  const result = await PaymentService.cancelPayment(
    query as Record<string, string>
  );

  if (!result.success) {
    res.redirect(
      `${config.SSL_CANCEL_FRONTEND_URL}?transactionId=${query.transactionId}&status=${query.status}`
    );
  }
});

const getInvoiceURL = catchAsync(async (req: Request, res: Response) => {
  const { paymentId } = req.params;

  const result = await PaymentService.getInvoiceURL(paymentId);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "GET Invoice URL successfully",
    data: result,
  });
});

export const PaymentController = {
  initPayment,
  successPayment,
  failPayment,
  cancelPayment,
  getInvoiceURL,
};
