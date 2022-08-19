import { createRouter } from "next-connect";
import { findEmployee } from "../../../controller/document-properties.controller";
import auth from "../../../middleware/auth";

const router = createRouter();

router.use(auth).get(findEmployee);

export default router.handler();
