import nc from "next-connect";
import {
  createRecipients,
  getListRecipients,
} from "../../../../controller/document-properties.controller";
import auth from "../../../../middleware/auth";
const handler = nc();

export default handler.use(auth).get(getListRecipients).post(createRecipients);
