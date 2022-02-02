import nc from "next-connect";
import { historiesIndex } from "../../../../controller/document-properties.controller";
import auth from "../../../../middleware/auth";
const handler = nc();

export default handler.use(auth).get(historiesIndex);
