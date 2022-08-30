import mongoose from "mongoose";
import timeZone from "mongoose-timezone";

const { Schema } = mongoose;

const bookingSchema = new Schema(
  {
    firstName: {
      trim: true,
      type: String,
      required: [true, "Please enter your name"],
      maxLength: [50, "Your name cannot exceed 50 characters"],
    },

    lastName: {
      trim: true,
      type: String,
      required: [true, "Please enter your name"],
      maxLength: [50, "Your name cannot exceed 50 characters"],
    },

    email: {
      type: String,
      required: [true, "Please enter your email number"],
    },

    contactNum: {
      type: String,
      required: [true, "Please enter your phone number"],
    },

    whatsappNum: {
      type: String,
    },

    address: {
      trim: true,
      type: String,
      required: [true, "Please enter your address"],
      maxLength: [250, "Your name cannot exceed 250 characters"],
    },

    bookingDate: {
      type: Date,
      required: true,
    },

    amountPaid: {
      type: Number,
      // required: true,
    },

    paymentInfo: {
      id: {
        type: String,
        // required: true,
      },
      status: {
        type: String,
        // required: true,
      },
      reference: {
        type: String,
        // required: true,
      },
    },
    status: {
      type: String,
      // required: true,
    },
    reference: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

bookingSchema.plugin(timeZone);

export default mongoose.models && mongoose.models.Booking
  ? mongoose.models.Booking
  : mongoose.model("Booking", bookingSchema);
