import nc from "next-connect";
import dbConnect from "../../../../../backend/config/dbConnect";
import {
  makeUserAdmin,
  removeAsAdmin,
} from "../../../../../backend/controllers/authController";
import { isAuth, isAdmin } from "../../../../../backend/middlewares";
import onError from "../../../../../backend/utils/errors";
const handler = nc({ onError });

dbConnect();

handler.use(isAuth, isAdmin).put(makeUserAdmin);
handler.use(isAuth, isAdmin).patch(removeAsAdmin);

export default handler;
