// untuk melakukan reject dan melakukan approve

import { createRouter } from "next-connect";
import { approveSign } from "../../../../controller/document-properties.controller";
import auth from "../../../../middleware/auth";
const router = createRouter();

router.use(auth).put(approveSign);

export default router.handler();
