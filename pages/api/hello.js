import nc from "next-connect";
import auth from "../../middleware/auth";
const handler = nc();

export default handler.use(auth).get(async (req, res) => {
  console.log(req.fetcher);
  res.json({ code: 200 });
});
