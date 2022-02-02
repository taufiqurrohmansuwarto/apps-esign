import nc from "next-connect";
import { currentDashboard } from "../../controller/document-properties.controller";
import auth from "../../middleware/auth";

const handler = nc();

export default handler.use(auth).get(currentDashboard);
