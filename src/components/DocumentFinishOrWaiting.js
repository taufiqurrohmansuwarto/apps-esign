import { Button, Col, Modal, Row, Skeleton, Space } from "antd";
import React, { useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import { useQuery } from "@tanstack/react-query";
import documents from "../services/documents";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

//  its done when the workflow is selfsign and signatory_status completed
//

export default function ({
  type = "initial",
  id,
  role = "reviewer",
  workflow = "selfSign",
}) {
  const [numPages, setNumPages] = useState(null);
  const { data, isLoading } = useQuery(["document", id], () =>
    documents.getDocumentFile(id, type)
  );

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

  return (
    <div>
      <div style={{ overflowY: "scroll", height: "79vh" }}>
        <ButtonHandler />
        <Skeleton loading={isLoading}>
          <Row justify="center">
            <Col>
              <div style={{ position: "relative" }}>
                <Document
                  file={`data:application/pdf;base64,${data?.data}`}
                  onLoadSuccess={onDocumentLoadSuccess}
                >
                  {Array.from(new Array(numPages), (el, index) => (
                    <div key={`page_${index}`} style={{ padding: 18 }}>
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
              </div>
            </Col>
          </Row>
        </Skeleton>
      </div>
    </div>
  );
}
