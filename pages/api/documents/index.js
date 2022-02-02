import nc from "next-connect";
import auth from "../../../middleware/auth";
import { listDocuments } from "../.././../controller/document-properties.controller";
const handler = nc();

export default handler.use(auth).get(listDocuments);
