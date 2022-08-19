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
    var ip = req.headers["x-forwarded-for"] || req.socket.remoteAddress;

    res
      .status(200)
      .json({
        fingerprint: req?.fingerprint,
        ip,
        ipInf: req?.ipInfo,
        helo: "world",
      });
  });

export default router.handler();
