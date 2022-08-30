import nc from "next-connect";
import dbConnect from "../../../../backend/config/dbConnect";
import { removeComment } from "../../../../backend/controllers/commentsController";
import { isAuth, isAdmin, isDoctor } from "../../../../backend/middlewares";
import onError from "../../../../backend/utils/errors";
const handler = nc({ onError });

dbConnect();

handler.use(isAuth).delete(removeComment);

export default handler;
