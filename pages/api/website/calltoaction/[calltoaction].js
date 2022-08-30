import nc from "next-connect";
import dbConnect from "../../../../backend/config/dbConnect";
import { getCallToAction } from "../../../../backend/controllers/websiteController";
import onError from "../../../../backend/utils/errors";

const handler = nc({ onError });

dbConnect();

handler.get(getCallToAction);

export default handler;
