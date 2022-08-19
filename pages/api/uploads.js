import multer from "multer";
import { createRouter } from "next-connect";
import { uploadDocument } from "../../controller/document-properties.controller";
import auth from "../../middleware/auth";

const router = createRouter();

export const config = {
  api: {
    bodyParser: false,
  },
};

router.use(auth).post(multer().single("document"), uploadDocument);

export default router.handler({});
