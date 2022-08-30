import Booking from "../models/bookingsModel";
import catchAsync from "../utils/catchAsync";
import AppError from "../utils/appError";
import axios from "axios";

export const newBooking = catchAsync(async (req, res, next) => {
  const {
    firstName,
    lastName,
    email,
    contactNum,
    whatsappNum,
    address,
    startDate,
    paymentInfo,
  } = req.body;

  // verifyTransaction
  const response = await axios.get(
    `https://api.paystack.co/transaction/verify/${req.body.paymentInfo.reference}`,
    {
      headers: {
        Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
      },
    }
  );

  if (response.data.data.status === "success") {
    const bookingdata = await new Booking({
      firstName,
      lastName,
      email,
      contactNum,
      whatsappNum,
      address,
      paymentInfo,
      bookingDate: startDate,
      reference: response.data.data.reference,
      amountPaid: response.data.data.amount,
      status: response.data.data.status,
    }).save();
    // console.log(bookingdata);
    res.send(bookingdata);
  }
});

export const getBookings = catchAsync(async (req, res, next) => {
  const data = await Booking.find({}).sort({ createdAt: -1 });
  res.send(data);
});
