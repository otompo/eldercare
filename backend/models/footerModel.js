import mongoose from "mongoose";
const { Schema } = mongoose;

const footerSchema = new Schema(
  {
    addressTitle: {
      trim: true,
      type: String,
      required: [true, "Please enter your title"],
      maxLength: [50, "Your name cannot exceed 50 characters"],
    },

    location: {
      trim: true,
      type: String,
      required: [true, "Please enter your location"],
      maxLength: [50, "Your name cannot exceed 50 characters"],
    },

    email: {
      trim: true,
      type: String,
      required: [true, "Please enter your email"],
      maxLength: [50, "Your name cannot exceed 50 characters"],
    },
    contactNum: {
      trim: true,
      type: String,
      required: [true, "Please enter your contact"],
      maxLength: [15, "Your name cannot exceed 15 characters"],
    },

    quickLinkTitle: {
      trim: true,
      type: String,
      required: [true, "Please enter your name"],
      maxLength: [50, "Your name cannot exceed 50 characters"],
    },

    socialTitle: {
      trim: true,
      type: String,
      required: [true, "Please enter your title"],
      maxLength: [50, "Your name cannot exceed 50 characters"],
    },

    facebook: {
      trim: true,
      type: String,
      required: [true, "Please enter your facebook"],
      maxLength: [30, "Your name cannot exceed 30 characters"],
    },

    facebookLink: {
      trim: true,
      type: String,
    },

    twitter: {
      trim: true,
      type: String,
      required: [true, "Please enter your twitter"],
      maxLength: [30, "Your name cannot exceed 30 characters"],
    },

    twitterLink: {
      trim: true,
      type: String,
    },

    instagram: {
      trim: true,
      type: String,
      required: [true, "Please enter your instagram"],
      maxLength: [30, "Your name cannot exceed 30 characters"],
    },

    instagramLink: {
      trim: true,
      type: String,
    },

    footer: {
      type: String,
      unique: true,
      lowercase: true,
    },
  },

  { timestamps: true }
);

export default mongoose.models && mongoose.models.Footer
  ? mongoose.models.Footer
  : mongoose.model("Footer", footerSchema);
