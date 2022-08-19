import { createRouter } from "next-connect";
import { checkDocument } from "../../../controller/public.controller";
import multer from "multer";

export const config = {
  api: {
    bodyParser: false,
  },
};

const router = createRouter();

router.post(multer().single("signed_file"), checkDocument);

export default router.handler();
