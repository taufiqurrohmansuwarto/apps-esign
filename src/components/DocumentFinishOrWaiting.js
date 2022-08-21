import { Button, Col, Modal, Row, Skeleton, Space } from "antd";
import React, { useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import { useQuery } from "@tanstack/react-query";
import documents from "../services/documents";
import DocumentLoading from "./DocumentLoading";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

//  its done when the workflow is selfsign and signatory_status completed

const RequestFromOthersReviewerNotFinish = () => {
  const handleConfirm = () => {
    Modal.confirm({
      title: "Konfirmasi",
      content: "Apakah anda yakin ingin menyetujui dokumen ini?",
      centered: true,
      onOk: () => {
        alert("setuju");
      },
    });
  };

  const handleReject = () => {
    Modal.confirm({
      title: "Konfirmasi",
      content: "Apakah anda yakin ingin menolak dokumen ini?",
      centered: true,
      onOk: () => {
        alert("setuju");
      },
    });
  };

  return (
    <>
      <Space>
        <Button onClick={handleConfirm}>Setujui</Button>
        <Button onClick={handleReject}>Tolak</Button>
      </Space>
    </>
  );
};

const RequestFromOthersReviewerFinish = () => {
  return <Button>request from others reviewer finish</Button>;
};

const RequestFromOthersSignFinish = () => {
  return <Button>request from others sign finish</Button>;
};

const RequestFromOthersSignNotFinish = () => {
  return <Button>request from others sign not finish</Button>;
};

export default function ({
  type = "initial",
  id,
  role = "reviewer",
  status,
  workflow = "selfSign",
}) {
  const [numPages, setNumPages] = useState(null);
  const { data, isLoading } = useQuery(
    ["document", id],
    () => documents.getDocumentFile(id, type),
    {
      refetchOnWindowFocus: false,
    }
  );

  const requestFromOthersReviewerNotFinished =
    workflow === "requestFromOthers" &&
    role === "reviewer" &&
    status !== "completed";

  const requestFromOthersReviewerFinished =
    workflow === "requestFromOthers" &&
    role === "reviewer" &&
    status === "completed";

  const requestFromOthersSignerNotFinished =
    workflow === "requestFromOthers" &&
    role === "signer" &&
    status !== "completed";

  const requestFromOthersSignerFinished =
    workflow === "requestFromOthers" &&
    role === "signer" &&
    status === "completed";

  const ButtonAction = () => {
    if (requestFromOthersReviewerNotFinished) {
      return <RequestFromOthersReviewerNotFinish />;
    } else if (requestFromOthersReviewerFinished) {
      return <RequestFromOthersReviewerFinish />;
    } else if (requestFromOthersSignerNotFinished) {
      return <RequestFromOthersSignNotFinish />;
    } else if (requestFromOthersSignerFinished) {
      return <RequestFromOthersSignFinish />;
    } else {
      return null;
    }
  };

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

  // reviewer
  const handleApproveReview = async () => {
    Modal.confirm({
      title: "Warn",
      content: <div>Are you sure want to approve this document?</div>,
    });
  };

  const handleRejectReview = async () => {
    Modal.confirm({
      title: "Warn",
      content: <div>Are you sure want to reject this document?</div>,
    });
  };

  // signer
  const handleApproveSign = async () => {};
  const handleRejectSign = async () => {};

  const ButtonHandler = () => {
    if (role === "done") {
      return null;
    } else if (role === "reviewer") {
      return (
        <Space>
          <Button type="primary" size="small" onClick={handleApproveReview}>
            Approve Review
          </Button>
          <Button size="small" onClick={handleRejectReview}>
            Reject Review
          </Button>
        </Space>
      );
    } else if (role === "signer") {
      return (
        <Space>
          <Button type="primary" size="small" onClick={handleApproveSign}>
            Approve Sign
          </Button>
          <Button size="small" onClick={handleRejectSign}>
            Reject Sign
          </Button>
        </Space>
      );
    }
  };

  if (isLoading) {
    return <DocumentLoading />;
  }

  return (
    <Row justify="center" style={{ zIndex: 1, backgroundColor: "grayText" }}>
      <Col span={24}>
        <div
          style={{
            width: "100%",
            height: "100%",
            overflow: "hidden",
            textAlign: "center",
          }}
        >
          <div
            style={{
              width: "100%",
              height: "70vh",
              overflowY: "scroll",
              boxSizing: "content-box",
              padding: "0px 10px",
            }}
          >
            <ButtonAction />
            <Row justify="center">
              <Document
                file={`data:application/pdf;base64,${data?.data}`}
                onLoadSuccess={onDocumentLoadSuccess}
                loading={<DocumentLoading />}
              >
                {Array.from(new Array(numPages), (el, index) => (
                  <div key={`page_${index}`} style={{ padding: 6 }}>
                    <Page
                      scale={1.2}
                      renderTextLayer={false}
                      renderMode="canvas"
                      renderAnnotationLayer={false}
                      pageNumber={index + 1}
                    />
                  </div>
                ))}
              </Document>
            </Row>
          </div>
        </div>
      </Col>
    </Row>
  );
}
