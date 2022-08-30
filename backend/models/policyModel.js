import mongoose from "mongoose";
const { Schema } = mongoose;

const policySchema = new Schema(
  {
    policyContent: {},

    policyTitle: {
      type: String,
    },

    policy: {
      type: String,
      unique: true,
      lowercase: true,
    },
  },

  { timestamps: true }
);

export default mongoose.models && mongoose.models.Policy
  ? mongoose.models.Policy
  : mongoose.model("Policy", policySchema);
