import mongoose from "mongoose";

const { Schema } = mongoose;
const { ObjectId } = mongoose.Schema;

const commentSchema = new Schema(
  {
    content: {
      type: String,
      required: true,
      max: 20000,
    },

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

    commentBy: { type: ObjectId, ref: "User" },
    patientId: { type: ObjectId, ref: "Patient" },
  },
  { timestamps: true }
);

export default mongoose.models && mongoose.models.Comment
  ? mongoose.models.Comment
  : mongoose.model("Comment", commentSchema);
