import nc from "next-connect";
import dbConnect from "../../../backend/config/dbConnect";
import { updateUserProfile } from "../../../backend/controllers/authController";
import onError from "../../../backend/utils/errors";
import { isAuth } from "../../../backend/middlewares";
const handler = nc({ onError });

dbConnect();

handler.use(isAuth).put(updateUserProfile);

export default handler;
