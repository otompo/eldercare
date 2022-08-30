import mongoose from "mongoose";
const { Schema } = mongoose;

const testimonialsSchema = new Schema(
  {
    name: {
      trim: true,
      type: String,
      required: [true, "Please enter your name"],
      maxLength: [50, "Your name cannot exceed 50 characters"],
    },
    message: {},
    image: {
      public_id: {
        type: String,
      },
      url: {
        type: String,
      },
    },
    slug: {
      type: String,
      unique: true,
      lowercase: true,
    },
  },

  { timestamps: true }
);

export default mongoose.models && mongoose.models.Testimonials
  ? mongoose.models.Testimonials
  : mongoose.model("Testimonials", testimonialsSchema);
