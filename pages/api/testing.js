import { createRouter } from "next-connect";
import { authWithIp } from "../../middleware/express-middleware";

const router = createRouter();

router.use(...authWithIp).get((req, res) => {
  var ip = req.headers["x-forwarded-for"] || req.socket.remoteAddress;

  res.status(200).json({
    fingerprint: req?.fingerprint,
    ip,
    ipInfo: req?.ipInfo,
  });
});

export default router.handler();
