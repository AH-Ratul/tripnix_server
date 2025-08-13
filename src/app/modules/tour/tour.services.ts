import { tourSearchableFields } from "./tour.constant";
import { ITour, ITourType } from "./tour.interface";
import { Tour, TourType } from "./tour.model";
import { QueryBuilder } from "../../utils/queryBuilder";
import { deleteImageFromCloudinary } from "../../config/cloudinary.config";

const createTour = async (payload: ITour) => {
  const existingTour = await Tour.findOne({ title: payload.title });

  if (existingTour) {
    throw new Error("A Tour with this title already exists");
  }

  const tour = await Tour.create(payload);

  return tour;
};

const getAllTours = async (query: Record<string, string>) => {
  const queryBuilder = new QueryBuilder(Tour.find(), query);

  const tours = await queryBuilder
    .search(tourSearchableFields)
    .filter()
    .sort()
    .fields()
    .paginate();

  const [data, meta] = await Promise.all([
    tours.build(),
    queryBuilder.getMeta(),
  ]);

  return {
    data,
    meta,
  };
};

const updateTour = async (id: string, payload: Partial<ITour>) => {
  const existingTour = await Tour.findById(id);

  if (!existingTour) {
    throw new Error("Tour not found");
  }

  if (
    payload.images &&
    payload.images.length > 0 &&
    existingTour.images &&
    existingTour.images.length > 0
  ) {
    payload.images = [...payload.images, ...existingTour.images];
  }

  if (
    payload.deleteImages &&
    payload.deleteImages.length > 0 &&
    existingTour.images &&
    existingTour.images.length > 0
  ) {
    const restDBImages = existingTour.images.filter(
      (imageUrl: string) => !payload.deleteImages?.includes(imageUrl)
    ) as unknown as string;

    const updatedPayloadImages = (payload.images || [])
      .filter((imageUrl: string) => !payload.deleteImages?.includes(imageUrl))
      .filter((imageUrl: any) => !restDBImages.includes(imageUrl));

    payload.images = [...restDBImages, ...updatedPayloadImages];
  }

  const updatedtour = await Tour.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });

  if (
    payload.deleteImages &&
    payload.deleteImages.length > 0 &&
    existingTour.images &&
    existingTour.images.length > 0
  ) {
    await Promise.all(
      payload.deleteImages.map((url) => deleteImageFromCloudinary(url))
    );
  }

  return updatedtour;
};

const deleteTour = async (id: string) => {
  return await Tour.findByIdAndDelete(id);
};

//----------------------- Tour Type -------------------------
const createTourType = async (payload: ITourType) => {
  const existingTourType = await TourType.findOne({ name: payload.name });

  if (existingTourType) {
    throw new Error("Tour type already exists");
  }

  return await TourType.create(payload);
};

const getAllTourType = async () => {
  return await TourType.find();
};

const updateTourType = async (id: string, payload: ITourType) => {
  const existingTourType = await TourType.findById(id);

  if (!existingTourType) {
    throw new Error("TourType not found");
  }

  const updatedTourType = await TourType.findByIdAndUpdate(id, payload, {
    new: true,
  });

  return updatedTourType;
};

const deleteTourType = async (id: string) => {
  const existingTourType = await TourType.findById(id);

  if (!existingTourType) {
    throw new Error("TourType not found");
  }

  return await TourType.findByIdAndDelete(id);
};

export const TourService = {
  createTour,
  getAllTours,
  updateTour,
  deleteTour,
  createTourType,
  getAllTourType,
  updateTourType,
  deleteTourType,
};
