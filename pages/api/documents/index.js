import { createRouter } from "next-connect";
import auth from "../../../middleware/auth";
import { listDocuments } from "../.././../controller/document-properties.controller";
const router = createRouter();

router.use(auth).get(listDocuments);

export default router.handler();
