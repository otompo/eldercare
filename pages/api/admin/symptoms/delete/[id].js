import nc from "next-connect";
import dbConnect from "../../../../../backend/config/dbConnect";
import { deleteSymptoms } from "../../../../../backend/controllers/symptomsController";
import { isAdmin, isAuth } from "../../../../../backend/middlewares";
import onError from "../../../../../backend/utils/errors";
const handler = nc({ onError });

dbConnect();

handler.use(isAuth, isAdmin).delete(deleteSymptoms);

export default handler;
