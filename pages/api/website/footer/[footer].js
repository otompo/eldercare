import nc from "next-connect";
import dbConnect from "../../../../backend/config/dbConnect";
import { getFooter } from "../../../../backend/controllers/websiteController";
import onError from "../../../../backend/utils/errors";

const handler = nc({ onError });

dbConnect();

handler.get(getFooter);

export default handler;
