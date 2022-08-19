import { createRouter } from "next-connect";
import { documentDetail } from "../../../../controller/document-properties.controller";
import auth from "../../../../middleware/auth";
const router = createRouter();

router.use(auth).get(documentDetail);

export default router.handler();
