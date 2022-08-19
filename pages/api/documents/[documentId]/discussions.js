import { createRouter } from "next-connect";
import {
  discussionsCreate,
  discussionsIndex,
} from "../../../../controller/document-properties.controller";
import auth from "../../../../middleware/auth";
const router = createRouter();

router.use(auth).get(discussionsIndex).post(discussionsCreate);

export default router.handler();
