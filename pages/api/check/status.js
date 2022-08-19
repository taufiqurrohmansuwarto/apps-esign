import { createRouter } from "next-connect";
import { checkStatus } from "../../../controller/public.controller";
import auth from "../../../middleware/auth";
const router = createRouter();

router.use(auth).get(checkStatus);

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
