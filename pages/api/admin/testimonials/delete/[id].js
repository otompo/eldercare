import nc from "next-connect";
import dbConnect from "../../../../../backend/config/dbConnect";
import { deleteTestimonial } from "../../../../../backend/controllers/testimonialsConroller";
import { isAuth, isAdmin } from "../../../../../backend/middlewares";
import onError from "../../../../../backend/utils/errors";
const handler = nc({ onError });

dbConnect();

handler.use(isAuth, isAdmin).delete(deleteTestimonial);

export default handler;
