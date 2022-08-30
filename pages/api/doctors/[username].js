import nc from "next-connect";
import dbConnect from "../../../backend/config/dbConnect";
import { readSingleDoctor } from "../../../backend/controllers/authController";
import { isAdmin, isAuth } from "../../../backend/middlewares";
import onError from "../../../backend/utils/errors";
const handler = nc({ onError });

dbConnect();

handler.use(isAuth, isAdmin).get(readSingleDoctor);

export default handler;
