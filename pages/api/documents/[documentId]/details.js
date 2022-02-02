import nc from "next-connect";
import { documentDetail } from "../../../../controller/document-properties.controller";
import auth from "../../../../middleware/auth";
const handler = nc();

export default handler.use(auth).get(documentDetail);
