import nc from "next-connect";
import dbConnect from "../../../backend/config/dbConnect";
import { contact } from "../../../backend/controllers/contactController";
import onError from "../../../backend/utils/errors";
const handler = nc({ onError });

dbConnect();

handler.post(contact);

export default handler;
