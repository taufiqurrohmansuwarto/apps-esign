import { createRouter } from "next-connect";
import { getActivities } from "../../controller/public.controller";
import auth from "../../middleware/auth";
const handler = createRouter();

export default handler.use(auth).get(getActivities);
