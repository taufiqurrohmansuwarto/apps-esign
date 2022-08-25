import { createRouter } from "next-connect";
import { checkDocumentById } from "../../../../controller/public.controller";

const router = createRouter();

router.get(checkDocumentById);

export default router.handler();
