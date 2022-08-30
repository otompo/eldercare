import mongoose from "mongoose";
import User from "./userModel";
const { Schema } = mongoose;

const postSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    content: {},
    published: { type: Boolean, default: true },
    postedBy: { type: mongoose.Schema.Types.ObjectId, ref: User },
    featuredImage: {
      public_id: {
        type: String,
      },
      url: {
        type: String,
      },
    },
    publishedDate: {
      type: Date,
      default: Date.now,
    },
    slug: {
      type: String,
      unique: true,
      lowercase: true,
    },
  },
  { timestamps: true }
);

export default mongoose.models && mongoose.models.Post
  ? mongoose.models.Post
  : mongoose.model("Post", postSchema);
