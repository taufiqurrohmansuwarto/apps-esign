import axios from "axios";
import { createRouter } from "next-connect";
const handler = createRouter();

const url = "http://www.africau.edu/images/default/sample.pdf";

// ini hanya testing untuk mendapat file menggunakan file buffer
export default handler.get(async (req, res) => {
  try {
    const result = await axios.get(url, { responseType: "arraybuffer" });
    const buffer = Buffer.from(result?.data, "binary").toString("base64");
    res.json(buffer);
  } catch (error) {
    console.log(error);
  }
});
