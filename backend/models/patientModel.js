import validator from "validator";
import mongoose from "mongoose";
import User from "./userModel";
import Symptoms from "./symptomsModel";

const { Schema } = mongoose;

const patientSchema = new Schema(
  {
    firstName: {
      trim: true,
      type: String,
      required: [true, "Please enter your first name"],
      maxLength: [50, "Your name cannot exceed 50 characters"],
    },
    lastName: {
      trim: true,
      type: String,
      required: [true, "Please enter your last name"],
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
      validate: [validator.isEmail, "Please enter valid email address"],
    },

    contactNum: {
      type: String,
      unique: true,
      required: [true, "Please enter your phone number"],
    },

    address: {
      type: String,
      trim: true,
    },

    region: {
      type: String,
      trim: true,
    },

    homeTown: {
      type: String,
      trim: true,
    },

    efullName: {
      type: String,
      trim: true,
    },
    relationship: {
      type: String,
      trim: true,
    },

    cellPhone: {
      type: String,
    },

    insuranceCarrier: {
      type: String,
      trim: true,
    },
    insurancePlan: {
      type: String,
      trim: true,
    },
    insuranceContact: {
      type: String,
    },
    policyNumber: {
      type: String,
    },
    groupNumber: {
      type: String,
      trim: true,
    },
    socialSecurityNumber: {
      type: String,
      trim: true,
    },
    organization: {
      type: String,
      trim: true,
    },
    primarycarephysician: {
      type: String,
      trim: true,
    },

    maritalstatus: {
      type: [String],
      default: ["Single"],
      enum: ["Married", "Single", "Divorced", "Widow", "Widower"],
    },

    gender: {
      type: [String],
      default: ["Male"],
      enum: ["Male", "Female", "Others"],
    },

    check: {
      type: Boolean,
    },

    dateofbirth: {
      type: Date,
    },

    healthConcern: {},

    bodyTemperature: {
      trim: true,
      type: String,
    },

    bloodPressure: {
      trim: true,
      type: String,
    },
    respirationRate: {
      trim: true,
      type: String,
    },

    pulseRate: {
      trim: true,
      type: String,
    },

    weight: {
      trim: true,
      type: String,
    },

    oxygen: {
      trim: true,
      type: String,
    },

    image: {
      public_id: {
        type: String,
      },
      url: {
        type: String,
      },
    },
    doctor: [{ type: mongoose.Schema.Types.ObjectId, ref: User }],
    nurse: [{ type: mongoose.Schema.Types.ObjectId, ref: User }],
    symptoms: [{ type: mongoose.Schema.Types.ObjectId, ref: Symptoms }],
  },

  { timestamps: true }
);

export default mongoose.models && mongoose.models.Patient
  ? mongoose.models.Patient
  : mongoose.model("Patient", patientSchema);
