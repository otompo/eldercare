import nc from "next-connect";
import dbConnect from "../../../../../backend/config/dbConnect";
import {
  assignADoctor,
  removeAssignDoctor,
} from "../../../../../backend/controllers/patientsController";
import { isAuth, isAdmin } from "../../../../../backend/middlewares";
import onError from "../../../../../backend/utils/errors";
const handler = nc({ onError });

dbConnect();

handler.use(isAuth, isAdmin).put(assignADoctor);
handler.use(isAuth, isAdmin).patch(removeAssignDoctor);

export default handler;
