import nc from "next-connect";
import dbConnect from "../../../../../backend/config/dbConnect";
import { updateTestimonial } from "../../../../../backend/controllers/testimonialsConroller";
import { isAuth, isAdmin } from "../../../../../backend/middlewares";
import onError from "../../../../../backend/utils/errors";
const handler = nc({ onError });

dbConnect();

handler.use(isAuth, isAdmin).put(updateTestimonial);

export default handler;
