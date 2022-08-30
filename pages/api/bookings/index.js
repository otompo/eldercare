import nc from "next-connect";
import dbConnect from "../../../backend/config/dbConnect";
import {
  getBookings,
  newBooking,
} from "../../../backend/controllers/bookingsController";
import onError from "../../../backend/utils/errors";
import { isAuth, isAdmin } from "../../../backend/middlewares";

const handler = nc({ onError });

dbConnect();

handler.post(newBooking);
handler.use(isAuth, isAdmin).get(getBookings);

export default handler;
