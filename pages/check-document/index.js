import {
  LoadingOutlined,
  SearchOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import {
  Alert,
  Breadcrumb,
  Button,
  Col,
  Descriptions,
  Divider,
  message,
  Modal,
  Result,
  Row,
  Upload,
} from "antd";
import Link from "next/link";
import { useState } from "react";
import documents from "../../src/services/documents";

const MAX_FILE_SIZE = 20;

const ResultDocument = ({ data, openModal }) => {
  const [result] = data;

  if (result?.summary !== null) {
    return (
      <Result
        status="success"
        title="Dokumen terverifikasi"
        subTitle="Dokumen yang anda upload mempunyai TTE dan sudah terverifikasi"
        children={
          <>
            <Descriptions layout="vertical">
              <Descriptions.Item label="Nama Dokumen">
                {result?.nama_dokumen}
              </Descriptions.Item>
              <Descriptions.Item label="Jumlah TTE">
                {result?.jumlah_signature}
              </Descriptions.Item>
              <Descriptions.Item label="Catatan">
                {result?.notes}
              </Descriptions.Item>
              <Descriptions.Item label="Detail">
                <ul>
                  {result?.details.map((detail) => (
                    <li key={detail.id}>
                      <div>
                        {" "}
                        Ditandatangani Oleh : {detail?.info_signer?.signer_name}
                      </div>
                      <div>Waktu : {detail?.signature_document?.signed_in}</div>
                    </li>
                  ))}
                </ul>
              </Descriptions.Item>
              <Descriptions.Item>
                <Button
                  icon={<SearchOutlined />}
                  type="primary"
                  onClick={openModal}
                >
                  Lihat File
                </Button>
              </Descriptions.Item>
            </Descriptions>
          </>
        }
      />
    );
  } else {
    return (
      <Result
        status="500"
        title="Invalid Document"
        subTitle="Dokumen yang anda upload tidak valid (tidak mempunyai tanda tangan elektronik)"
        children={
          <>
            <Descriptions layout="vertical">
              <Descriptions.Item label="Nama Dokumen">
                {result?.nama_dokumen}
              </Descriptions.Item>
              <Descriptions.Item label="Jumlah TTE">
                {result?.jumlah_signature}
              </Descriptions.Item>
              <Descriptions.Item label="Catatan">
                {result?.notes}
              </Descriptions.Item>
              <Descriptions.Item label="Detail">
                {JSON.stringify(result?.details)}
              </Descriptions.Item>
              <Descriptions.Item>
                {/* <Button
                  icon={<SearchOutlined />}
                  type="primary"
                  onClick={openModal}
                >
                  Lihat File
                </Button> */}
              </Descriptions.Item>
            </Descriptions>
          </>
        }
      />
    );
  }
};

const ModalViewPdf = ({ visible, onCancel, fileUrl }) => {
  const HEIGHT = 800;
  const WIDTH = 600;
  return (
    <Modal
      cancelText="Tutup"
      title="Detail PDF"
      width={WIDTH + 200}
      centered
      visible={visible}
      onCancel={onCancel}
    >
      <object
        data={fileUrl}
        height={HEIGHT}
        width={WIDTH + 150}
        type="application/pdf"
      ></object>
    </Modal>
  );
};

const getBase64 = (img, callback) => {
  const reader = new FileReader();
  reader.addEventListener("load", () => callback(reader.result));
  reader.readAsDataURL(img);
};

const CheckDocument = () => {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [fileUrl, setFileUrl] = useState(null);

  const [showModal, setShowModal] = useState(false);
  const cancelModal = () => setShowModal(false);
  const openModal = () => setShowModal(true);

  const checkerFile = async (file) => {
    setLoading(true);
    setResult(null);
    setFileUrl(null);
    try {
      const { type, size } = file;
      const lt20mb = size / 1024 / 1024 < MAX_FILE_SIZE;
      const isPdf = type === "application/pdf";

      if (!lt20mb || !isPdf) {
        message.error(
          `File at least ${MAX_FILE_SIZE} MB and file format must be .pdf`
        );
        setLoading(false);
        setResult(null);
      } else {
        const formData = new FormData();
        formData.append("signed_file", file);
        const result = await documents.checkDocumentPublic(formData);
        setResult(result);
        message.success("Dokumen berhasil diperiksa");
        setLoading(false);
        getBase64(file, (url) => {
          setFileUrl(url);
        });
        return isPdf && lt20mb ? true : Upload.LIST_IGNORE;
      }
    } catch (error) {
      setLoading(false);
      setResult(null);
      setFileUrl(null);
      message.error(error);
    }
  };

  return (
    <Row style={{ maxHeight: "100vh" }} justify="center" align="stretch">
      <Col span={12}>
        <ModalViewPdf
          fileUrl={fileUrl}
          visible={showModal}
          onCancel={cancelModal}
        />
        <Breadcrumb>
          <Breadcrumb.Item>
            <Link href="/">
              <a>Beranda</a>
            </Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item>Cek Dokumen</Breadcrumb.Item>
        </Breadcrumb>

        <Alert
          style={{ marginTop: "20px" }}
          showIcon
          type="warning"
          message="Perlu diperhatikan"
          description="Siapkan dokumen yang akan diupload. File harus memiliki format .pdf dan berukuran kurang dari 1 MB. Kemudian klik tombol upload dan tunggu sampai proses verifikasi selesai."
        />
        <Divider />
        <Upload
          beforeUpload={checkerFile}
          maxCount={1}
          accept=".pdf"
          showUploadList={false}
        >
          <Button
            type="primary"
            icon={loading ? <LoadingOutlined /> : <UploadOutlined />}
            disabled={loading}
          >
            Unggah Dokumen
          </Button>
        </Upload>

        {result && <ResultDocument openModal={openModal} data={result} />}
      </Col>
    </Row>
  );
};

export default CheckDocument;
