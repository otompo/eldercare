import mongoose from "mongoose";
const { Schema } = mongoose;

const heroSchema = new Schema(
  {
    title: {
      trim: true,
      type: String,
      required: [true, "Please enter your name"],
      maxLength: [50, "Your name cannot exceed 50 characters"],
    },

    slogan: {
      trim: true,
      type: String,
      required: [true, "Please enter your name"],
      maxLength: [50, "Your name cannot exceed 50 characters"],
    },

    content: {},

    fullwithImage: {
      public_id: {
        type: String,
      },
      url: {
        type: String,
      },
    },

    image: {
      public_id: {
        type: String,
      },
      url: {
        type: String,
      },
    },
    hero: {
      type: String,
      unique: true,
      lowercase: true,
    },
  },

  { timestamps: true }
);

export default mongoose.models && mongoose.models.Hero
  ? mongoose.models.Hero
  : mongoose.model("Hero", heroSchema);
