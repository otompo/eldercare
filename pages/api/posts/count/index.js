import nc from "next-connect";
import dbConnect from "../../../../backend/config/dbConnect";
import { postCount } from "../../../../backend/controllers/postsController";
import onError from "../../../../backend/utils/errors";
const handler = nc({ onError });

dbConnect();

handler.get(postCount);

export default handler;
