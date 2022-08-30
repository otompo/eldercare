import mongoose from "mongoose";
const { Schema } = mongoose;

const servicesSchema = new Schema(
  {
    title: {
      trim: true,
      type: String,
      required: [true, "Please enter your name"],
      maxLength: [50, "Your name cannot exceed 50 characters"],
    },
    content: {},
    icon: {
      type: String,
    },
    slug: {
      type: String,
      unique: true,
      lowercase: true,
    },
  },

  { timestamps: true }
);

export default mongoose.models && mongoose.models.Services
  ? mongoose.models.Services
  : mongoose.model("Services", servicesSchema);
