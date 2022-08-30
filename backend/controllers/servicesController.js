import Services from "../models/servicesModel";
import catchAsync from "../utils/catchAsync";
import AppError from "../utils/appError";
import slugify from "slugify";

export const createService = catchAsync(async (req, res, next) => {
  const { title, content, icon } = req.body;
  if (!title || !content) {
    return next(new AppError("All Fields are require", 400));
  }

  const service = await new Services({
    slug: slugify(title),
    title,
    content,
    icon,
  }).save();

  res.send(service);
});

export const updateServices = catchAsync(async (req, res, next) => {
  const { slug } = req.query;
  const { title, content, icon } = req.body;

  //   const prevData = await Services.findOne({ slug });

  const update = await Services.findOneAndUpdate(
    { slug },
    {
      slug: slugify(title),
      title,
      content,
      icon,
    },
    {
      new: true,
    }
  );
  res.status(200).send(update);
});

export const getServices = catchAsync(async (req, res, next) => {
  const service = await Services.find().sort({ createdAt: -1 });
  res.send(service);
});

export const deleteServices = catchAsync(async (req, res, next) => {
  const { id } = req.query;
  const data = await Services.findByIdAndDelete(id);
  res.json({ ok: true });
});
