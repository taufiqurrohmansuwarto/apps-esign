import axios from "axios";
import FormData from "form-data";

const esignFetcher = axios.create({
  baseURL: "https://siasn.bkd.jatimprov.go.id/pemprov-api/vendor/esign",
});

export const checkDocument = async (req, res) => {
  try {
    const file = req?.file;
    if (!file) {
      res.status(400).json({ code: 400, message: "No file found" });
    } else {
      const { originalname: title, buffer: fileBuffer } = file;
      const formData = new FormData();
      formData.append("signed_file", fileBuffer, title);
      const result = await esignFetcher.post("/check-document", formData);
      res.json(result?.data);
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({ code: 400, message: "Internal Server Error" });
  }
};
