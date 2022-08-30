import mongoose from "mongoose";
const { Schema } = mongoose;

const calltoactionSchema = new Schema(
  {
    mainTitle: {
      trim: true,
      type: String,
      required: [true, "Please enter your name"],
      maxLength: [50, "Your name cannot exceed 50 characters"],
    },

    callSlogan: {
      trim: true,
      type: String,
      required: [true, "Please enter your name"],
      maxLength: [150, "Your name cannot exceed 250 characters"],
    },

    titleOne: {
      trim: true,
      type: String,
      required: [true, "Please enter your name"],
      maxLength: [50, "Your name cannot exceed 50 characters"],
    },

    contentOne: {},

    titleTow: {
      trim: true,
      type: String,
      required: [true, "Please enter your name"],
      maxLength: [50, "Your name cannot exceed 50 characters"],
    },

    contentTow: {},

    titleThree: {
      trim: true,
      type: String,
      required: [true, "Please enter your name"],
      maxLength: [50, "Your name cannot exceed 50 characters"],
    },

    contentThree: {},

    titleFour: {
      trim: true,
      type: String,
      required: [true, "Please enter your name"],
      maxLength: [50, "Your name cannot exceed 50 characters"],
    },

    contentFour: {},

    calltoaction: {
      type: String,
      unique: true,
      lowercase: true,
    },
  },

  { timestamps: true }
);

export default mongoose.models && mongoose.models.Calltoaction
  ? mongoose.models.Calltoaction
  : mongoose.model("Calltoaction", calltoactionSchema);
