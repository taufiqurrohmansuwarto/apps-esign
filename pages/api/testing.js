import { createRouter } from "next-connect";
import {
  expressCompression,
  expressFingerPrint,
} from "../../middleware/express-middleware";

const router = createRouter();

router
  .use(expressCompression)
  .use(expressFingerPrint)
  .get((req, res) => {
    res.status(200).json(req?.fingerprint);
  });

export default router.handler();
