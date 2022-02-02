// untuk melakukan reject dan melakukan approve

import nc from "next-connect";
import {
  approveReview,
  rejectReview,
} from "../../../../controller/document-properties.controller";
import auth from "../../../../middleware/auth";
const handler = nc();

export default handler.use(auth).put(approveReview).delete(rejectReview);
