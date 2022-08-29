import { AxiosError } from "axios";
import FormData from "form-data";
import qs from "query-string";

const checkDocument = (fetcher, documentId) => {
  return fetcher.get(`/documents/${documentId}/check`);
};

const stamps = (fetcher) => {
  return fetcher.get("/stamps");
};

const otp = (fetcher, documentId) => {
  return fetcher.post(`/documents/${documentId}/otp`);
};

const findEmployeeApi = (fetcher, nip) => {
  return fetcher.get(`/stamps/${nip}`);
};

// sign
const approveSignApi = (fetcher, documentId, data) => {
  return fetcher.put(`/documents/${documentId}/sign-request`, data);
};

export const approveSign = async (req, res) => {
  try {
    const { documentId } = req.query;
    const data = req.body;
    await approveSignApi(req.fetcher, documentId, data);
    res.json({ code: "sukses" });
  } catch (error) {
    if (error instanceof AxiosError) {
      const code = error.response?.data?.code;
      const message = error.response?.data?.message;
      console.log(code, message);
      res.status(code).json({ code, message });
    } else {
      res.status(400).json({ code: 400, message: "Internal Server Error" });
    }
  }
};

const uploadBackend = (fetcher, formdata) => {
  return fetcher.post("/uploads", formdata, {
    headers: formdata?.getHeaders(),
  });
};

const listDocumentsApi = ({ fetcher, query }) => {
  const url = qs.stringify(query);
  return fetcher.get(`/documents?${url}`);
};

const recipients = (fetcher, documentId) => {
  return fetcher.get(`/documents/${documentId}/recipients`);
};

const recipientsCreate = (fetcher, documentId, data) => {
  return fetcher.post(`/documents/${documentId}/recipients`, data);
};

export const findEmployee = async (req, res) => {
  try {
    const { employeeNumber } = req.query;
    const { fetcher } = req;

    const result = await findEmployeeApi(fetcher, employeeNumber);
    res.json(result.data);
  } catch (error) {
    console.log(error);
    res.status(400).json({ code: 400, message: "Internal Server Error" });
  }
};

const fetchDiscussions = (fetcher, id) => {
  return fetcher.get(`/documents/${id}/discussions`).then((res) => res?.data);
};

const createDiscussion = (fetcher, id, data) => {
  return fetcher.post(`/documents/${id}/discussions`, data);
};

const updateDiscussion = (fetcher, id, data) => {
  return fetcher.patch(`/documents/${id}/dicsussions`, data);
};

const removeDiscussion = (fetcher, id) => {
  return fetcher.delete(`/documents/${id}/discussions`);
};

const fetchHistories = (fetcher, query) => {
  const { documentId, ...currentUrl } = query;
  const url = qs.stringify(currentUrl);
  return fetcher.get(`/documents/${documentId}/histories?${url}`);
};

const fetchSingleDocument = (fetcher, query) => {
  const { documentId, ...currentUrl } = query;
  const url = qs.stringify(currentUrl);
  return fetcher.get(`/documents/${documentId}?${url}`);
};

const detailDocument = (fetcher, documentId) => {
  return fetcher.get(`/documents/${documentId}/details`);
};

export const getStamps = async (req, res) => {
  try {
    const result = await stamps(req.fetcher);
    res.json(result?.data);
  } catch (error) {
    console.log(error);
    res.status(400).json({ code: 400, message: "Internal Server Error" });
  }
};

export const approve = async (req, res) => {
  try {
    const { documentId } = req.query;
    const data = req.body;
    await approveDocument(req?.fetcher, documentId, data);
    res.json({ code: 200 });
  } catch (error) {
    console.log(error);
    res.status(400).json({ code: 400, message: "Internal Server Error" });
  }
};

export const listDocuments = async (req, res) => {
  const result = await listDocumentsApi(req);
  res.json(result?.data);
};

// recipients
export const getListRecipients = async (req, res) => {
  try {
    const { documentId } = req.query;
    const result = await recipients(req.fetcher, documentId);
    res.json(result?.data);
  } catch (error) {
    console.log(error);
    res.status(400).json({ code: 400, message: "Internal Server Error" });
  }
};

// discussions
export const discussionsIndex = async (req, res) => {
  try {
    const { documentId } = req.query;
    const result = await fetchDiscussions(req.fetcher, documentId);
    res.json(result?.data);
  } catch (error) {
    res
      .status(error?.data?.statusCode)
      .json({ code: 400, message: "Internal Server Error" });
  }
};

export const discussionsCreate = async (req, res) => {
  try {
    const { documentId } = req.query;
    const { body } = req;
    await createDiscussion(req.fetcher, documentId, body);
    res.status(200).json({ code: 201, message: "successfully created" });
  } catch (error) {
    console.log(error);
    res.status(400).json({ code: 400, message: "Internal Server Error" });
  }
};

export const updateDiscussions = async (req, res) => {
  try {
    const { documentId } = req?.query;
    const { body } = req;
    await updateDiscussion(req.fetcher, documentId, body);
    res.status(200).json({ code: 200, message: "success" });
  } catch (error) {
    console.log(error);
    res.status(400).json({ code: 400, message: "Internal Server Error" });
  }
};

export const removeDiscussions = async (req, res) => {
  try {
    const { documentId } = req?.query;
    await removeDiscussion(req.fetcher, documentId);
    res.status(200).json({ code: 200, messsage: "success" });
  } catch (error) {
    console.log(error);
    res.status(400).json({ code: 400, message: "Internal Server Error" });
  }
};

export const historiesIndex = async (req, res) => {
  try {
    const { query } = req;
    const result = await fetchHistories(req.fetcher, query);
    res.json(result?.data);
  } catch (error) {
    console.log(error);
    res.json({ code: 400, message: "Internal Server Error" });
  }
};

export const documentDetail = async (req, res) => {
  try {
    const { documentId } = req.query;
    const result = await detailDocument(req.fetcher, documentId);
    res.json(result?.data);
  } catch (error) {
    res.status(400).json({ code: 400, message: "Internal Server Error" });
  }
};

export const createRecipients = async (req, res) => {
  try {
    const { documentId } = req.query;
    const data = req.body;
    const result = await recipientsCreate(req.fetcher, documentId, data);
    res.json(result?.data);
  } catch (error) {
    console.log(error);
    res.status(400).json({ code: 400, message: "Internal Server Errror" });
  }
};

export const currentDashboard = async (req, res) => {
  try {
    const { fetcher } = req;
    const result = await fetcher.get("/dashboard");
    res.json(result?.data);
  } catch (error) {
    console.log(error);
    res.status(400).json({ code: 400, message: "Internal Server Error" });
  }
};

export const uploadDocument = async (req, res) => {
  try {
    // console.log(req.file);
    const { workflow, title } = req.body;
    const file = req.file;
    const formData = new FormData();
    formData.append("workflow", workflow);
    formData.append("title", title);
    formData.append("document", file?.buffer, `${title}?.pdf`);
    const result = await uploadBackend(req.fetcher, formData);
    const [hasil] = result?.data;
    res.json(hasil);
  } catch (error) {
    console.log(error);
    res.status(400).json({ code: 400, message: "Internal Server Error" });
  }
};

export const publicDocumentChecker = async (req, res) => {
  try {
    const { documentId } = req.query;
    const result = await checkDocument(req.fetcher, documentId);
    res.json(result?.data);
  } catch (error) {
    res.status(400).json({ code: 400, message: "Internal Server Error" });
  }
};

export const requestOtp = async (req, res) => {
  try {
    const { documentId } = req.query;
    const result = await otp(req.fetcher, documentId);
    res.json(result?.data);
  } catch (error) {
    console.log(error);
    res.status(400).json({ code: 400, message: "Internal Server Error" });
  }
};

export const fetchSingleDocuments = async (req, res) => {
  try {
    const result = await fetchSingleDocument(req.fetcher, req.query);
    res.json(result?.data);
  } catch (error) {
    console.log(error);
    res.status(400).json({ code: 400, message: "Internal Server Error" });
  }
};

// reviewer
export const approveReview = async (req, res) => {
  try {
    const { fetcher } = req;
    const { documentId } = req.query;

    const result = await fetcher.put(`/documents/${documentId}/review-request`);
    res.json(result?.data);
  } catch (error) {
    console.log(error);
    res.status(400).json({ code: 400, message: "Internal Server Error" });
  }
};

export const rejectReview = async (req, res) => {
  try {
    const { fetcher } = req;
    const { documentId } = req.query;

    const result = await fetcher.delete(
      `/documents/${documentId}/review-request`
    );
    res.json(result?.data);
  } catch (error) {
    console.log(error);
    res.status(400).json({ code: 400, message: "Internal Server Error" });
  }
};
