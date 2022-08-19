import { createRouter } from "next-connect";
import {
  createRecipients,
  getListRecipients,
} from "../../../../controller/document-properties.controller";
import auth from "../../../../middleware/auth";
const router = createRouter();

router.use(auth).get(getListRecipients).post(createRecipients);

export default router.handler();
