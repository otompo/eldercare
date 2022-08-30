import nc from "next-connect";
import dbConnect from "../../../../../backend/config/dbConnect";
import { deleteServices } from "../../../../../backend/controllers/servicesController";
import { isAuth, isAdmin } from "../../../../../backend/middlewares";
import onError from "../../../../../backend/utils/errors";
const handler = nc({ onError });

dbConnect();

handler.use(isAuth, isAdmin).delete(deleteServices);

export default handler;
