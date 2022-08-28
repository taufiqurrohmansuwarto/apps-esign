import { Button, Col, message, Modal, Row, Skeleton, Space } from "antd";
import React, { useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import documents from "../services/documents";
import DocumentLoading from "./DocumentLoading";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

//  its done when the workflow is selfsign and signatory_status completed

const RequestFromOthersReviewerNotFinish = ({ id }) => {
  const queryClient = useQueryClient();

  const { mutateAsync: confirmReview } = useMutation(
    () => documents.approveReview(id),
    {
      onSuccess: () => {
        message.success("Dokumen berhasil diupdate");
      },
      onSettled: () => {
        queryClient.invalidateQueries(["layout-view", id]);
      },
    }
  );

  const { mutateAsync: rejectReview } = useMutation(
    () => documents.rejectReview(id),
    {
      onSuccess: () => {
        message.success("Dokumen berhasil diupdate");
      },
      onSettled: () => {
        queryClient.invalidateQueries(["layout-view", id]);
      },
    }
  );

  const handleConfirm = () => {
    Modal.confirm({
      title: "Konfirmasi",
      content: "Apakah anda yakin ingin menyetujui dokumen ini?",
      centered: true,
      onOk: () => {
        return new Promise(async (resolve, reject) => {
          try {
            const result = await confirmReview();
            resolve(result);
          } catch (error) {
            reject(error);
          }
        });
      },
    });
  };

  const handleReject = () => {
    Modal.confirm({
      title: "Konfirmasi",
      content: "Apakah anda yakin ingin menolak dokumen ini?",
      centered: true,
      onOk: () => {
        return new Promise(async (resolve, reject) => {
          try {
            const result = await rejectReview();
            resolve(result);
          } catch (error) {
            reject(error);
          }
        });
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
    ["document-view-detail", id],
    () => documents.getDocumentFile(id, type),
    {}
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
      return <RequestFromOthersReviewerNotFinish id={id} />;
    } else if (requestFromOthersReviewerFinished) {
      return <RequestFromOthersReviewerFinish id={id} />;
    } else if (requestFromOthersSignerNotFinished) {
      return <RequestFromOthersSignNotFinish id={id} />;
    } else if (requestFromOthersSignerFinished) {
      return <RequestFromOthersSignFinish id={id} />;
    } else {
      return null;
    }
  };

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

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
