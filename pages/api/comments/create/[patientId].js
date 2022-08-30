import nc from "next-connect";
import dbConnect from "../../../../backend/config/dbConnect";
import { createComment } from "../../../../backend/controllers/commentsController";
import { isAuth, isDoctorOrNurse } from "../../../../backend/middlewares";
import onError from "../../../../backend/utils/errors";
const handler = nc({ onError });

dbConnect();

handler.use(isAuth, isDoctorOrNurse).post(createComment);

export default handler;
