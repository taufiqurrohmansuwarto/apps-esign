import { createRouter } from "next-connect";
import {
  approveReview,
  rejectReview,
} from "../../../../controller/document-properties.controller";
import auth from "../../../../middleware/auth";
const router = createRouter();

router.use(auth).put(approveReview).delete(rejectReview);

export default router.handler();
