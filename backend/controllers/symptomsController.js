import Symptoms from "../models/symptomsModel";
import catchAsync from "../utils/catchAsync";
import AppError from "../utils/appError";
import slugify from "slugify";

// create symptoms
export const createSymptoms = catchAsync(async (req, res, next) => {
  const { name } = req.body;
  let slug = slugify(name).toLowerCase();
  const alreadyExist = await Symptoms.findOne({ slug });
  if (alreadyExist) {
    return next(new AppError("Symptom name already exist", 400));
  }
  let symptoms = await new Symptoms({ name, slug }).save();
  res.status(200).send(symptoms);
});

// get all symptoms
export const getAllSymptoms = catchAsync(async (req, res, next) => {
  const symptoms = await Symptoms.find({}).sort({ createdAt: -1 });
  res.status(200).send(symptoms);
});

export const deleteSymptoms = catchAsync(async (req, res, next) => {
  const { id } = req.query;
  const symptoms = await Symptoms.findById(id);

  if (!symptoms) {
    return next(new AppError("Symptoms not found with this ID", 400));
  }

  await symptoms.remove();

  res.status(200).json({
    success: true,
  });
});
