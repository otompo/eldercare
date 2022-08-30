import mongoose from "mongoose";
const { Schema } = mongoose;

const amountSchema = new Schema(
  {
    amount: {
      type: Number,
      require: true,
    },
    slugamount: {
      type: String,
      unique: true,
      lowercase: true,
    },
  },

  { timestamps: true }
);

export default mongoose.models && mongoose.models.Amount
  ? mongoose.models.Amount
  : mongoose.model("Amount", amountSchema);
