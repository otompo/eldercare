import nc from "next-connect";
import dbConnect from "../../../../backend/config/dbConnect";
import {
  addUser,
  getAllStaffs,
} from "../../../../backend/controllers/authController";
import { isAuth, isAdmin } from "../../../../backend/middlewares";
import onError from "../../../../backend/utils/errors";
const handler = nc({ onError });

dbConnect();

handler.use(isAuth, isAdmin).post(addUser);
handler.use(isAuth, isAdmin).get(getAllStaffs);

export default handler;
