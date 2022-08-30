import nc from "next-connect";
import dbConnect from "../../../../backend/config/dbConnect";
import {
  createService,
  getServices,
} from "../../../../backend/controllers/servicesController";

import { isAuth, isAdmin } from "../../../../backend/middlewares";
import onError from "../../../../backend/utils/errors";
const handler = nc({ onError });

dbConnect();

handler.get(getServices);
handler.use(isAuth, isAdmin).post(createService);

export default handler;
