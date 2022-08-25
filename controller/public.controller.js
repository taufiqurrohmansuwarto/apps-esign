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

// cek status by document id
export const checkDocumentById = async (req, res) => {
  try {
    const { documentId } = req?.query;
    const result = await esignFetcher.get(`/check-document/${documentId}`);
    res.json(result?.data);
  } catch (error) {
    console.log(error);
    res.status(400).json({ code: 400, message: "Internal Server Error" });
  }
};

// coba cek status
export const checkStatus = async (req, res) => {
  try {
    const { fetcher } = req;
    const result = await fetcher.get("/status");
    res.json(result?.data);
  } catch (error) {
    console.log(error);
    res.status(400).json({ code: 400, message: "Internal Server Error" });
  }
};

export const getActivities = async (req, res) => {
  try {
    const { fetcher } = req;
    const result = await fetcher.get("/activities");
    res.json(result?.data);
  } catch (error) {
    console.log(error);
    res.status(400).json({ code: 400, message: "Internal Server Error" });
  }
};
