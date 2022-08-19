import { createRouter } from "next-connect";
import { requestOtp } from "../../../../controller/document-properties.controller";
import auth from "../../../../middleware/auth";
const router = createRouter();

router.use(auth).post(requestOtp);

export default router.handler();
