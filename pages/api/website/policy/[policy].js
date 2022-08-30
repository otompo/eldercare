import nc from "next-connect";
import dbConnect from "../../../../backend/config/dbConnect";
import { getPolicy } from "../../../../backend/controllers/websiteController";
import onError from "../../../../backend/utils/errors";

const handler = nc({ onError });

dbConnect();

handler.get(getPolicy);

export default handler;
