import axios from "axios";
import qs from "query-string";

const download = () => {
  return axios
    .get("/esign/api/documents/12323/download")
    .then((res) => res?.data);
};

const getStamps = () => {
  return axios.get("/esign/api/stamps").then((res) => res.data?.data);
};

const getDocumentFile = (documentId, type = "initial") => {
  return axios
    .get(`/esign/api/documents/${documentId}?type=${type}`)
    .then((res) => res?.data);
};

// to motherfucker search
const findEmployee = (employeeNumber) => {
  return axios
    .get(`/esign/api/employees/${employeeNumber}`)
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
  console.log(url);
  return axios.get(`/esign/api/documents?${url}`).then((res) => res.data);
};

const getRecipients = (documentId) => {
  return axios
    .get(`/esign/api/documents/${documentId}/recipients`)
    .then((res) => res?.data);
};

const fetchDiscussions = (documentId) => {
  return axios.get(`/esign/api/documents/${documentId}/discussions`);
};

const createDiscussions = (documentId, data) => {
  return axios
    .post(`/esign/api/documents/${documentId}/discussions`, data)
    .then((res) => res?.data);
};

const fetchHistories = (query) => {
  const { documentId, ...currentQuery } = query;

  const url = qs.stringify(currentQuery);
  return axios
    .get(`/esign/api/documents/${documentId}/histories?${url}`)
    .then((res) => res?.data);
};

const detailDocument = (documentId) => {
  return axios
    .get(`/esign/api/documents/${documentId}/details`)
    .then((res) => res?.data);
};

const createRecipients = ({ documentId, data }) => {
  return axios
    .post(`/esign/api/documents/${documentId}/recipients`, data)
    .then((res) => res.data);
};

const getDashboard = () => {
  return axios.get("/esign/api/dashboard").then((res) => res.data);
};

const upload = (data) => {
  return axios.post("/esign/api/uploads", data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

const checkDocument = (documentId) => {
  return axios.get(`/esign/api/documents/${documentId}/check`);
};

const requestOtp = (documentId) => {
  return axios.post(`/esign/api/documents/${documentId}/otp`);
};

const approveSign = (data) => {
  const { documentId, ...result } = data;
  return axios.put(`/esign/api/documents/${documentId}/sign`, result);
};

export default {
  download,
  getStamps,
  getDocumentFile,
  findEmployee,
  getDocuments,
  getRecipients,
  createRecipients,
  getDashboard,
  // discussions
  fetchDiscussions,
  createDiscussions,
  // histories
  fetchHistories,
  detailDocument,
  upload,
  checkDocument,
  requestOtp,

  // sign and review
  approveSign,
};
