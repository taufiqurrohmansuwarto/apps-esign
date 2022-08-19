import axios from "axios";
import qs from "query-string";

const esignFetcher = axios.create({
  baseURL: "/esign/api",
});

const download = () => {
  return esignFetcher.get("/documents/12323/download").then((res) => res?.data);
};

const getStamps = () => {
  return esignFetcher.get("/stamps").then((res) => res.data?.data);
};

const getDocumentFile = (documentId, type = "initial") => {
  return esignFetcher
    .get(`/documents/${documentId}?type=${type}`)
    .then((res) => res?.data);
};

const findEmployee = (employeeNumber) => {
  return esignFetcher
    .get(`/employees/${employeeNumber}`)
    .then((res) => res.data);
};

const getDocuments = (query = { type: "all", page: 0, pageSize: 10 }) => {
  const currentQuery = {
    type: query?.type,
    page: query?.page - 1,
    pageSize: query?.pageSize,
    title: query?.title,
  };

  const url = qs.stringify(currentQuery);
  return esignFetcher.get(`/documents?${url}`).then((res) => res.data);
};

const getRecipients = (documentId) => {
  return esignFetcher
    .get(`/documents/${documentId}/recipients`)
    .then((res) => res?.data);
};

const fetchDiscussions = (documentId) => {
  return esignFetcher.get(`/documents/${documentId}/discussions`);
};

const createDiscussions = (documentId, data) => {
  return esignFetcher
    .post(`/documents/${documentId}/discussions`, data)
    .then((res) => res?.data);
};

const fetchHistories = (query) => {
  const { documentId, ...currentQuery } = query;

  const url = qs.stringify(currentQuery);
  return esignFetcher
    .get(`/documents/${documentId}/histories?${url}`)
    .then((res) => res?.data);
};

const detailDocument = (documentId) => {
  return esignFetcher
    .get(`/documents/${documentId}/details`)
    .then((res) => res?.data);
};

const createRecipients = ({ documentId, data }) => {
  return esignFetcher
    .post(`/documents/${documentId}/recipients`, data)
    .then((res) => res.data);
};

const getDashboard = () => {
  return esignFetcher.get("/dashboard").then((res) => res.data);
};

const upload = (data) => {
  return esignFetcher
    .post("/uploads", data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    .then((res) => res?.data);
};

const checkDocument = (documentId) => {
  return esignFetcher.get(`/documents/${documentId}/check`);
};

const requestOtp = (documentId) => {
  return esignFetcher.post(`/documents/${documentId}/otp`);
};

const approveSign = (data) => {
  const { documentId, ...result } = data;
  return esignFetcher.put(`/documents/${documentId}/sign`, result);
};

const checkDocumentPublic = (data) => {
  return esignFetcher
    .post(`/check/document`, data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    .then((res) => res.data);
};

const checkStatus = () => {
  return esignFetcher.get("/check/status").then((res) => res?.data);
};

const getActivities = () => {
  return esignFetcher.get("/activities").then((res) => res.data);
};

export default {
  getActivities,
  checkStatus,
  download,
  getStamps,
  getDocumentFile,
  findEmployee,
  getDocuments,
  getRecipients,
  createRecipients,
  getDashboard,
  fetchDiscussions,
  createDiscussions,
  fetchHistories,
  detailDocument,
  upload,
  checkDocument,
  requestOtp,
  approveSign,
  checkDocumentPublic,
};
