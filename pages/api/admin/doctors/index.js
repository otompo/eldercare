import nc from "next-connect";
import dbConnect from "../../../../backend/config/dbConnect";
import { getAllDoctors } from "../../../../backend/controllers/authController";
import { isAuth, isAdmin } from "../../../../backend/middlewares";
import onError from "../../../../backend/utils/errors";
const handler = nc({ onError });

dbConnect();

handler.use(isAuth, isAdmin).get(getAllDoctors);

export default handler;
