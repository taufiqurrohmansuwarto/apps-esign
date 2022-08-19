import { createRouter } from "next-connect";
import { publicDocumentChecker } from "../../../../controller/document-properties.controller";
import auth from "../../../../middleware/auth";

const router = createRouter();

router.use(auth).get(publicDocumentChecker);

export default router.handler();
