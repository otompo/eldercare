import nc from "next-connect";
import dbConnect from "../../../../../backend/config/dbConnect";
import { updatePost } from "../../../../../backend/controllers/postsController";
import { isAdmin, isAuth } from "../../../../../backend/middlewares";
import onError from "../../../../../backend/utils/errors";
const handler = nc({ onError });

dbConnect();

handler.use(isAuth, isAdmin).put(updatePost);

export default handler;
