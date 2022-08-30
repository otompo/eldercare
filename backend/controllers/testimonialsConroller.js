import Testimonials from "../models/testimonialsModel";
import catchAsync from "../utils/catchAsync";
import AppError from "../utils/appError";
import cloudinary from "cloudinary";
import slugify from "slugify";

cloudinary.config({
  cloud_name: "codesmart",
  api_key: "924552959278257",
  api_secret: "nyl74mynmNWo5U0rzF8LqzcCE8U",
});

export const createTestimonial = catchAsync(async (req, res, next) => {
  const { name, image, message } = req.body;

  const result = await cloudinary.v2.uploader.upload(image, {
    folder: "legacygrace",
  });
  const testimonial = await new Testimonials({
    slug: slugify(name),
    name,
    message,
    image: {
      public_id: result.public_id,
      url: result.url,
    },
  }).save();
  res.send(testimonial);
});

export const updateTestimonial = catchAsync(async (req, res, next) => {
  const { slug } = req.query;
  const { name, image, message } = req.body;

  const prevData = await Testimonials.findOne({ slug });

  await cloudinary.v2.uploader.destroy(prevData.image.public_id);
  const result = await cloudinary.v2.uploader.upload(image, {
    folder: "legacygrace",
  });
  if (image) {
    const update = await Testimonials.findOneAndUpdate(
      { slug },
      {
        slug: slugify(name),
        name,
        message,
        image: {
          public_id: result.public_id,
          url: result.url,
        },
      },
      {
        new: true,
      }
    );
    res.status(200).send(update);
  } else {
    const update = await Testimonials.findOneAndUpdate(
      id,
      {
        slug: slugify(name),
        name,
        message,
      },
      {
        new: true,
      }
    );
    res.status(200).send(update);
  }
});

export const getTestimonials = catchAsync(async (req, res, next) => {
  const testimonial = await Testimonials.find({}).sort({ createdAt: -1 });
  res.send(testimonial);
});

export const deleteTestimonial = catchAsync(async (req, res, next) => {
  const { id } = req.query;
  const data = await Testimonials.findByIdAndDelete(id);
  await cloudinary.v2.uploader.destroy(data.image.public_id);
  res.json({ ok: true });
});
