import nc from "next-connect";
import dbConnect from "../../../../backend/config/dbConnect";
import {
  createPatient,
  getAllPatients,
} from "../../../../backend/controllers/patientsController";
import { isAuth, isAdmin } from "../../../../backend/middlewares";
import onError from "../../../../backend/utils/errors";
const handler = nc({ onError });

dbConnect();

handler.use(isAuth, isAdmin).post(createPatient);
handler.use(isAuth, isAdmin).get(getAllPatients);

export default handler;
