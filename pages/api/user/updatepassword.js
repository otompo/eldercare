import nc from "next-connect";
import dbConnect from "../../../backend/config/dbConnect";
import { updateUserPassword } from "../../../backend/controllers/authController";
import { isAuth } from "../../../backend/middlewares";

import onError from "../../../backend/utils/errors";
const handler = nc({ onError });

dbConnect();

handler.use(isAuth).put(updateUserPassword);

export default handler;
