import { createRouter } from "next-connect";
import {
  expressCompression,
  expressFingerPrint,
  expressIp,
} from "../../middleware/express-middleware";

const router = createRouter();

router
  .use(expressCompression)
  .use(expressFingerPrint)
  .use(expressIp)
  .get((req, res) => {
    var ip = req.headers["x-forwarded-for"] || req.socket.remoteAddress;

    res.status(200).json({
      fingerprint: req?.fingerprint,
      ip,
      ipInfo: req?.ipInfo,
    });
  });

export default router.handler();
