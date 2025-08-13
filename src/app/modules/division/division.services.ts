import { deleteImageFromCloudinary } from "../../config/cloudinary.config";
import { IDivision } from "./division.interface";
import { Division } from "./division.model";

const createDivision = async (payload: IDivision) => {
  const existingDivision = await Division.findOne({ name: payload.name });

  if (existingDivision) {
    throw new Error("A Division with this name already exists");
  }

  const division = await Division.create(payload);

  return division;
};

const getAllDivision = async () => {
  const allDivision = await Division.find({});
  const totalDivision = await Division.countDocuments();

  return {
    data: allDivision,
    meta: {
      total: totalDivision,
    },
  };
};

const getSingleDivision = async (slug: string) => {
  const allDivision = await Division.findOne({ slug });

  return {
    data: allDivision,
  };
};

const updateDivision = async (id: string, payload: Partial<IDivision>) => {
  const existingDivision = await Division.findById(id);

  if (!existingDivision) {
    throw new Error("Division not found");
  }

  const duplicateDivision = await Division.findOne({
    name: payload.name,
    _id: { $ne: id },
  });

  if (duplicateDivision) {
    throw new Error("A Division with this name already exists");
  }

  const updatedDivision = await Division.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });

  if (payload.thumbnail && existingDivision.thumbnail) {
    await deleteImageFromCloudinary(existingDivision.thumbnail);
  }

  return updatedDivision;
};

const deleteDivision = async (id: string) => {
  await Division.findByIdAndDelete(id);
  return null;
};

export const DivisionService = {
  createDivision,
  getAllDivision,
  getSingleDivision,
  updateDivision,
  deleteDivision,
};
