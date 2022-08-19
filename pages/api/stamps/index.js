import { createRouter } from "next-connect";
import { getStamps } from "../../../controller/document-properties.controller";
import auth from "../../../middleware/auth";

const handler = createRouter();

export default handler.use(auth).get(getStamps);
