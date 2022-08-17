import nc from "next-connect";
import { checkDocument } from "../../../controller/public.controller";
import multer from "multer";

export const config = {
  api: {
    bodyParser: false,
  },
};

const handler = nc();

export default handler.post(multer().single("signed_file"), checkDocument);
