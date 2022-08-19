import { createRouter } from "next-connect";
import { currentDashboard } from "../../controller/document-properties.controller";
import auth from "../../middleware/auth";
import { expressCompression } from "../../middleware/express-middleware";

const router = createRouter();

router.use(auth).use(expressCompression).get(currentDashboard);

router.all((req, res) => {
  res.status(405).json({
    error: "Method not allowed",
  });
});

export default router.handler({
  onError(err, req, res) {
    res.status(400).json({
      error: err.message,
    });
  },
});
