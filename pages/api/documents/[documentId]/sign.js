// untuk melakukan reject dan melakukan approve

import { createRouter } from "next-connect";
import { approveSign } from "../../../../controller/document-properties.controller";
import auth from "../../../../middleware/auth";
const handler = createRouter();

export default handler.use(auth).put(approveSign);
