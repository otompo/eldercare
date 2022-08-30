import nc from "next-connect";
import dbConnect from "../../../../../backend/config/dbConnect";
import {
  moveUserFromTrash,
  moveUserToTrash,
} from "../../../../../backend/controllers/authController";
import { isAuth, isAdmin } from "../../../../../backend/middlewares";
import onError from "../../../../../backend/utils/errors";
const handler = nc({ onError });

dbConnect();

handler.use(isAuth, isAdmin).patch(moveUserFromTrash);
handler.use(isAuth, isAdmin).put(moveUserToTrash);

export default handler;
