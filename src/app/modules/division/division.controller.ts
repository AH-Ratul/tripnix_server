import { Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { DivisionService } from "./division.services";
import { sendResponse } from "../../utils/sendResponse";
import httpStatus from "http-status-codes";

const createDivision = catchAsync(async (req: Request, res: Response) => {
    console.log(req.body);
  const result = await DivisionService.createDivision(req.body);
  console.log("res", result)

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "Division Created",
    data: result,
  });
});

const getAllDivision = catchAsync(async (req: Request, res: Response) => {
  const result = await DivisionService.getAllDivision();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Division Retrieved",
    data: result.data,
    meta: result.meta,
  });
});

const getSingleDivision = catchAsync(async (req: Request, res: Response) => {
  const slug = req.params.slug;
  const result = await DivisionService.getSingleDivision(slug);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Division Retrieved",
    data: result.data,
  });
});

const updateDivision = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await DivisionService.updateDivision(id, req.body);

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "Division Updated",
    data: result,
  });
});

const deleteDivision = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await DivisionService.deleteDivision(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Division Deleted",
    data: result,
  });
});

export const DivisionController = {
  createDivision,
  getAllDivision,
  getSingleDivision,
  updateDivision,
  deleteDivision,
};
