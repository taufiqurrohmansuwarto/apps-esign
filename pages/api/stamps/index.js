import { createRouter } from "next-connect";
import { getStamps } from "../../../controller/document-properties.controller";
import auth from "../../../middleware/auth";

const router = createRouter();

router.use(auth).get(getStamps);

export default router.handler();
