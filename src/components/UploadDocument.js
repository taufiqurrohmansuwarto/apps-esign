import { InboxOutlined } from "@ant-design/icons";
import { Input, message, Modal, Upload } from "antd";
import { useRouter } from "next/router";
import { useState } from "react";
import documents from "../services/documents";

const UploadDocument = ({ type = "selfSign" }) => {
  const [filename, setFilename] = useState(null);
  const [showModal, setShowModal] = useState();
  const [fileList, setFileList] = useState([]);
  const [loadingSubmit, setLoadingSubmit] = useState(false);

  const router = useRouter();

  const handleCloseModal = () => {
    setShowModal(false);
    setFileList([]);
  };

  const handleOkModal = async () => {
    const file = fileList[0];
    const formData = new FormData();
    const title = filename?.trim();

    try {
      if (!title) {
        message.warn("Document title is required!");
      } else {
        setLoadingSubmit(true);
        formData.append("document", file);
        formData.append("title", title);
        formData.append("workflow", type);
        const document = await documents.upload(formData);

        let currentType;
        if (type === "selfSign") {
          currentType = "self-sign";
        } else if (type === "requestFromOthers") {
          currentType = "share-only";
        } else if (type === "signAndShare") {
          currentType = "sign-and-share";
        }

        setLoadingSubmit(false);
        router.push(
          `/uploads/${currentType}/sign?documentId=${document?.data?.document?.id}`
        );
      }
    } catch (error) {
      setLoadingSubmit(false);
      console.log(JSON.stringify(error));
      message.error("error");
    }
  };

  const checkerFile = (file) => {
    const { type, size } = file;
    const lt20mb = size / 1024 / 1024 < 20;
    const isPdf = type === "application/pdf";
    if (!isPdf) {
      message.error("Format must be PDF!");
    }
    if (!lt20mb) {
      message.error("File at least 20 MB");
    }
    setShowModal(isPdf && lt20mb);
    setFileList([file]);
    const newName = file?.name?.split(".").slice(0, -1).join(".");
    setFilename(newName);
    return isPdf && lt20mb ? true : Upload.LIST_IGNORE;
  };

  return (
    <div>
      <Modal
        title="Filename"
        visible={showModal}
        onCancel={handleCloseModal}
        onOk={handleOkModal}
        confirmLoading={loadingSubmit}
        okText="Upload"
        cancelText="Cancel"
        centered
      >
        {fileList.length && (
          <Input
            value={filename}
            required
            onChange={(e) => setFilename(e?.target?.value)}
          />
        )}
      </Modal>
      <Upload.Dragger
        maxCount={1}
        accept=".pdf"
        beforeUpload={checkerFile}
        showUploadList={false}
      >
        <p className="ant-upload-drag-icon">
          <InboxOutlined />
        </p>
        <p className="ant-upload-text">
          Click or drag file to this area to upload
        </p>
        <p className="ant-upload-hint">
          You can name your document after uploaded
        </p>
      </Upload.Dragger>
    </div>
  );
};

export default UploadDocument;
