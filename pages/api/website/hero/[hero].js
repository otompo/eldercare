import nc from "next-connect";
import dbConnect from "../../../../backend/config/dbConnect";
import { getHero } from "../../../../backend/controllers/websiteController";
import onError from "../../../../backend/utils/errors";

const handler = nc({ onError });

dbConnect();

handler.get(getHero);

export default handler;
