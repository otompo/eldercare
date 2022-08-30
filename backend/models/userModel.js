import validator from "validator";
import mongoose from "mongoose";
const { Schema } = mongoose;

const userSchema = new Schema(
  {
    name: {
      trim: true,
      type: String,
      required: [true, "Please enter your name"],
      maxLength: [50, "Your name cannot exceed 50 characters"],
    },
    username: {
      trim: true,
      type: String,
      lowercase: true,
      required: [true, "Please enter your username"],
    },

    email: {
      type: String,
      unique: true,
      required: [true, "Please enter your email"],
      validate: [validator.isEmail, "Please enter valid email address"],
    },

    contactNum: {
      type: String,
      unique: true,
      required: [true, "Please enter your phone number"],
    },
    image: {
      public_id: {
        type: String,
      },
      url: {
        type: String,
      },
    },
    password: {
      type: String,
      trim: true,
      required: [true, "Please enter your password"],
      minlength: [6, "Your password must be longer than 6 characters"],
      select: false,
    },

    role: {
      type: [String],
      default: ["admin"],
      enum: ["doctor", "patient", "nurse", "admin"],
    },
    // role: {
    //   type: String,
    //   default: "doctor",
    // },
    bio: {
      type: String,
      max: 20000,
    },
    active: {
      type: Boolean,
      default: true,
      select: false,
    },

    generatedPasword: {
      type: String,
    },
  },

  { timestamps: true }
);

export default mongoose.models && mongoose.models.User
  ? mongoose.models.User
  : mongoose.model("User", userSchema);
