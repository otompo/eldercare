import nc from "next-connect";
import dbConnect from "../../../backend/config/dbConnect";
import { getAllPosts } from "../../../backend/controllers/postsController";
import onError from "../../../backend/utils/errors";
const handler = nc({ onError });

dbConnect();

handler.get(getAllPosts);

export default handler;
