import { createRouter } from "next-connect";
import {
  discussionsCreate,
  discussionsIndex,
  removeDiscussions,
  updateDiscussions,
} from "../../../../controller/document-properties.controller";
import auth from "../../../../middleware/auth";
const router = createRouter();

router
  .use(auth)
  .get(discussionsIndex)
  .post(discussionsCreate)
  .patch(updateDiscussions)
  .delete(removeDiscussions);

export default router.handler();
