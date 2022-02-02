import multer from "multer";
import nc from "next-connect";
import { uploadDocument } from "../../controller/document-properties.controller";
import auth from "../../middleware/auth";

const handler = nc();

export const config = {
  api: {
    bodyParser: false,
  },
};

export default handler
  .use(auth)
  .post(multer().single("document"), uploadDocument);
