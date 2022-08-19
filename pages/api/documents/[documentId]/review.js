// untuk melakukan reject dan melakukan approve

import { createRouter } from "next-connect";
import {
  approveReview,
  rejectReview,
} from "../../../../controller/document-properties.controller";
import auth from "../../../../middleware/auth";
const handler = createRouter();

export default handler.use(auth).put(approveReview).delete(rejectReview);
