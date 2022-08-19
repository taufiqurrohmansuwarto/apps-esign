import { createRouter } from "next-connect";
import { fetchSingleDocuments } from "../../../../controller/document-properties.controller";
import auth from "../../../../middleware/auth";
const router = createRouter();

router.use(auth).get(fetchSingleDocuments);

export default router.handler();
