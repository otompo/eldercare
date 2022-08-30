import nc from "next-connect";
import { currentAdmin } from "../../../../backend/controllers/authController";
import dbConnect from "../../../../backend/config/dbConnect";
import { isAuth } from "../../../../backend/middlewares";
import onError from "../../../../backend/utils/errors";
const handler = nc({ onError });

dbConnect();

handler.use(isAuth).get(currentAdmin);

export default handler;
