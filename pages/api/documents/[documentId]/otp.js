import nc from "next-connect";
import { requestOtp } from "../../../../controller/document-properties.controller";
import auth from "../../../../middleware/auth";
const handler = nc();

export default handler.use(auth).post(requestOtp);
