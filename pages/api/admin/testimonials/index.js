import nc from "next-connect";
import dbConnect from "../../../../backend/config/dbConnect";
import {
  createTestimonial,
  getTestimonials,
} from "../../../../backend/controllers/testimonialsConroller";
import { isAuth, isAdmin } from "../../../../backend/middlewares";
import onError from "../../../../backend/utils/errors";
const handler = nc({ onError });

dbConnect();

handler.get(getTestimonials);
handler.use(isAuth, isAdmin).post(createTestimonial);

export default handler;
