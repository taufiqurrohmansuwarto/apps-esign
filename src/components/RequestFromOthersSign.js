import {
  Card,
  Col,
  Input,
  InputNumber,
  Modal,
  Pagination,
  Row,
  Skeleton,
  Space,
} from "antd";
import { useRef, useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import DocumentLoading from "./DocumentLoading";
import ShareAndRequest from "./ShareAndRequest";
import SignMove from "./SignMoveMultiple";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const PdfDocument = ({
  docUrl,
  changePageDocument,
  loadPageSuccess,
  documents,
  documentProperty,
  dataSignFilter,
  updateFrame,
  removeSign,
  currentPage,
  totalPage,
  onChangePage,
}) => {
  const onLoadDocumentSucces = ({ numPages }) => {
    changePageDocument({ currentPage: 1, totalPage: numPages });
  };

  const onLoadPageSuccess = ({
    width,
    height,
    originalWidth,
    originalHeight,
  }) => {
    const payload = { width, height, originalWidth, originalHeight };
    loadPageSuccess(payload);
  };

  const ref = useRef(null);

  return (
    <div
      style={{
        width: "100%",
        height: "72vh",
        overflowY: "scroll",
        boxSizing: "content-box",
        padding: "0px 10px",
      }}
    >
      <>
        <div
          style={{
            position: "fixed",
            right: "4rem",
            marginTop: 10,
            zIndex: 10,
          }}
        >
          <ShareAndRequest />
        </div>
        <div
          style={{
            position: "fixed",
            right: "4rem",
            bottom: "4rem",
            marginTop: 10,
            zIndex: 10,
            backgroundColor: "white",
            padding: 10,
            borderRadius: 5,
          }}
        >
          <Pagination
            size="small"
            current={currentPage}
            onChange={onChangePage}
            total={totalPage}
            simple
            defaultPageSize={1}
          />
        </div>
        <Row justify="center">
          <Col>
            <div ref={ref} style={{ position: "relative" }}>
              {dataSignFilter.map((sign) => (
                <SignMove
                  currentRef={ref.current}
                  frame={sign.frame}
                  key={sign.id}
                  id={sign.id}
                  bounds={{
                    height: documentProperty.height,
                    width: documentProperty.width,
                  }}
                  images={sign.stamp}
                  updateFrame={updateFrame}
                  removeSign={removeSign}
                />
              ))}
              <Document
                file={`data:application/pdf;base64,${docUrl}`}
                onLoadSuccess={onLoadDocumentSucces}
                loading={<DocumentLoading />}
              >
                <Page
                  onLoadSuccess={onLoadPageSuccess}
                  renderTextLayer={false}
                  scale={1}
                  pageNumber={documents.currentPage}
                />
              </Document>
            </div>
          </Col>
        </Row>
      </>
    </div>
  );
};

// main export
const RequestFromOthersSign = function ({
  loading,
  docUrl,
  signSymbol,
  documentProperty,
  dataSignFilter,
  changePageDocument,
  loadPageSuccess,
  documents,
  changePagination,
  updateFrame,
  removeSign,
}) {
  const [open, setOpen] = useState(false);
  const [otp, setOtp] = useState("");
  const [reason, setReason] = useState("I approve this document");

  if (loading == "loading") {
    return <DocumentLoading />;
  }

  return (
    <>
      <Modal
        title="OTP Verification"
        visible={open}
        zIndex={99999}
        closable={false}
        onOk={() => {}}
        maskClosable={false}
        onCancel={() => {
          setOpen(false);
        }}
      >
        <p>Masukkan passphrase anda</p>
        <InputNumber
          placeholder="OTP Number"
          value={otp}
          onChange={(e) => setOtp(e)}
        />
        <Input
          placeholder="Reason"
          value={reason}
          onChange={(e) => setReason(e.target.value)}
        />
      </Modal>
      <div>
        <Row
          justify="center"
          style={{ zIndex: 1, backgroundColor: "grayText" }}
        >
          <Col span={24}>
            <div
              style={{
                width: "100%",
                height: "100%",
                overflow: "hidden",
                textAlign: "center",
              }}
            >
              {loading === "idle" && docUrl && (
                <PdfDocument
                  docUrl={docUrl}
                  // paging
                  currentPage={documents.currentPage}
                  totalPage={documents.totalPage}
                  onChangePage={changePagination}
                  loadPageSuccess={loadPageSuccess}
                  changePageDocument={changePageDocument}
                  documents={documents}
                  dataSignFilter={dataSignFilter}
                  images={signSymbol}
                  documentProperty={documentProperty}
                  updateFrame={updateFrame}
                  removeSign={removeSign}
                />
              )}
            </div>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default RequestFromOthersSign;
