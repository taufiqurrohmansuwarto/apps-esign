import { createRouter } from "next-connect";
import { publicDocumentChecker } from "../../../../controller/document-properties.controller";
import auth from "../../../../middleware/auth";

const handler = createRouter();

export default handler.use(auth).get(publicDocumentChecker);
