import nc from "next-connect";
import dbConnect from "../../../../backend/config/dbConnect";
import {
  createPost,
  getAllAdminPosts,
} from "../../../../backend/controllers/postsController";
import { isAuth, isAdmin } from "../../../../backend/middlewares";
import onError from "../../../../backend/utils/errors";
const handler = nc({ onError });

dbConnect();

handler.use(isAuth, isAdmin).post(createPost);
handler.use(isAuth, isAdmin).get(getAllAdminPosts);

export default handler;
