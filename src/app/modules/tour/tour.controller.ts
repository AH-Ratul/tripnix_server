import { Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { TourService } from "./tour.services";
import { sendResponse } from "../../utils/sendResponse";
import httpStatus from "http-status-codes";

const createTour = catchAsync(async (req: Request, res: Response) => {
  const result = await TourService.createTour(req.body);

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "Tour Created",
    data: result,
  });
});

const getAllTours = catchAsync(async (req: Request, res: Response) => {
  const query = req.query;
  const result = await TourService.getAllTours(query as Record<string, string>);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Tour Retireved Successfully",
    data: result.data,
    meta: result.meta,
  });
});

const updateTour = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await TourService.updateTour(id, req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Tour Updated",
    data: result,
  });
});

const deleteTour = catchAsync(async (req: Request, res: Response) => {
  const result = await TourService.deleteTour(req.params.id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Tour Deleted",
    data: result,
  });
});

//--------------------- Tour Type --------------------
const createTourType = catchAsync(async (req: Request, res: Response) => {
  const result = await TourService.createTourType(req.body);

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "Tour Type Created",
    data: result,
  });
});

const getAllTourType = catchAsync(async (req: Request, res: Response) => {
  const result = await TourService.getAllTourType();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Tour Type Retrieved",
    data: result,
  });
});

const updateTourType = catchAsync(async (req: Request, res: Response) => {
  const result = await TourService.updateTourType(req.params.id, req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Tour Type Updated",
    data: result,
  });
});

const deleteTourType = catchAsync(async (req: Request, res: Response) => {
  const result = await TourService.deleteTourType(req.params.id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Tour Type Deleted",
    data: result,
  });
});

export const TourController = {
  createTour,
  updateTour,
  deleteTour,
  getAllTours,
  createTourType,
  getAllTourType,
  updateTourType,
  deleteTourType,
};
