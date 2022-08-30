import nc from "next-connect";
import dbConnect from "../../../backend/config/dbConnect";
import { relatedNursePatients } from "../../../backend/controllers/patientsController";
import { isAuth } from "../../../backend/middlewares";
import onError from "../../../backend/utils/errors";
const handler = nc({ onError });

dbConnect();

handler.use(isAuth).get(relatedNursePatients);

export default handler;
