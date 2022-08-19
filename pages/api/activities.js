import { createRouter } from "next-connect";
import { getActivities } from "../../controller/public.controller";
import auth from "../../middleware/auth";
const router = createRouter();

router.use(auth).get(getActivities);
export default router.handler();
