import { createRouter } from "next-connect";
import { historiesIndex } from "../../../../controller/document-properties.controller";
import auth from "../../../../middleware/auth";
const router = createRouter();

router.use(auth).get(historiesIndex);

export default router.handler();
