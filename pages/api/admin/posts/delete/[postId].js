import nc from "next-connect";
import dbConnect from "../../../../../backend/config/dbConnect";
import { deletePost } from "../../../../../backend/controllers/postsController";
import { isAuth } from "../../../../../backend/middlewares";
import onError from "../../../../../backend/utils/errors";
const handler = nc({ onError });

dbConnect();

handler.use(isAuth).delete(deletePost);

export default handler;
