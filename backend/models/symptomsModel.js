import mongoose from "mongoose";
const { Schema } = mongoose;

const symptomsSchema = new Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
      unique: true,
      max: 52,
    },
    slug: {
      type: String,
      unique: true,
      index: true,
    },
  },
  { timestamps: true }
);

export default mongoose.models && mongoose.models.Symptoms
  ? mongoose.models.Symptoms
  : mongoose.model("Symptoms", symptomsSchema);
