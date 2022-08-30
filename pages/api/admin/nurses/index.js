import nc from "next-connect";
import dbConnect from "../../../../backend/config/dbConnect";
import { getAllNurses } from "../../../../backend/controllers/authController";
import { isAuth, isAdmin } from "../../../../backend/middlewares";
import onError from "../../../../backend/utils/errors";
const handler = nc({ onError });

dbConnect();

handler.use(isAuth, isAdmin).get(getAllNurses);

export default handler;
