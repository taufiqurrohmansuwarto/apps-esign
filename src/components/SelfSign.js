import { WarningOutlined } from "@ant-design/icons";
import {
  Button,
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
import { useRouter } from "next/router";
import { useRef, useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import { useMutation } from "@tanstack/react-query";
import documentServices from "../../src/services/documents";
import SignMove from "./SignMove";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const PdfDocument = ({
  docUrl,
  changePageDocument,
  loadPageSuccess,
  documents,
  documentProperty,
  signFilter,
  updateFrame,
  images,
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
        height: "70vh",
        overflowY: "scroll",
        boxSizing: "content-box",
        padding: "0px 10px",
      }}
    >
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
          simple
          current={currentPage}
          total={totalPage}
          defaultPageSize={1}
          size="small"
          onChange={onChangePage}
        />
      </div>
      <div></div>
      <Row justify="center">
        <Col>
          <div ref={ref} style={{ position: "relative" }}>
            {signFilter.map((sign) => (
              <SignMove
                currentRef={ref.current}
                frame={sign.frame}
                key={sign.id}
                id={sign.id}
                bounds={{
                  height: documentProperty.height,
                  width: documentProperty.width,
                }}
                images={images}
                updateFrame={updateFrame}
                removeSign={removeSign}
              />
            ))}
            <Document
              file={`data:application/pdf;base64,${docUrl}`}
              onLoadSuccess={onLoadDocumentSucces}
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
    </div>
  );
};

// main export
const SelfSign = function ({
  loading,
  docUrl,
  signSymbol,
  documentProperty,
  signFilter,
  signs,
  changePageDocument,
  loadPageSuccess,
  documents,
  changePagination,
  updateFrame,
  documentData,
  addSign,
  removeSign,
}) {
  const [open, setOpen] = useState(false);
  const [document, setDocument] = useState(null);
  const [otp, setOtp] = useState("");
  const [reason, setReason] = useState("I approve this document");
  const [passphrase, setPassphrase] = useState("");
  const router = useRouter();

  const otpMutation = useMutation((id) => documentServices.requestOtp(id), {
    onSuccess: () => {
      setOpen(true);
    },
    onError: (err) => {
      console.log(err);
    },
  });

  const approveSignMutation = useMutation(
    (d) => documentServices.approveSign(d),
    {
      onSuccess: () => {
        router.push("/documents/list/all");
      },
      onError: (error) => {
        console.log(error);
      },
    }
  );

  const handleSign = async () => {
    try {
      const { id } = documentData;
      const properties = signs.map((sign) => {
        const { frame, page } = sign;
        const [x, y] = frame.translate;
        const { height, width } = frame;

        const xPos = x < 0 ? 0 : x;
        const yPos = y < 0 ? 0 : y;

        return {
          xPos,
          yPos,
          height,
          width,
          page,
        };
      });

      const data = {
        documentId: id,
        properties,
        otp,
        passphrase,
        reason,
      };

      await approveSignMutation.mutateAsync(data);
    } catch (error) {
      console.log(error);
    }
  };

  const onSubmit = async () => {
    const { id } = documentData;
    await otpMutation.mutateAsync(id);
  };

  if (loading == "loading") {
    return (
      <Row justify="center" align="middle" style={{ padding: 18 }}>
        <Card style={{ width: 600, height: 800 }}>
          <Skeleton avatar={{ size: 100 }} active />
          <Skeleton paragraph active />
          <Skeleton paragraph active />
          <Row justify="center" align="middle">
            <Space size="large">
              <Skeleton.Image size="large" active />
              <Skeleton.Image size="large" active />
              <Skeleton.Image size="large" active />
            </Space>
          </Row>
          <Skeleton paragraph active />
        </Card>
      </Row>
    );
  }

  return (
    <>
      <Modal
        title="OTP Verification"
        width={700}
        visible={open}
        zIndex={99999}
        closable={false}
        onOk={handleSign}
        confirmLoading={approveSignMutation.isLoading}
        maskClosable={false}
        centered
        // confirmLoading={signDocumentRequest.loading}
        onCancel={() => {
          setOpen(false);
        }}
      >
        <p>We already sent code verification to your email. Please verify.</p>
        <Space direction="vertical">
          <Input
            style={{ width: 300 }}
            placeholder="Passphrase"
            value={passphrase}
            onChange={(e) => setPassphrase(e?.target?.value)}
          />
          <InputNumber
            style={{ width: 300 }}
            placeholder="OTP Number"
            value={otp}
            onChange={(e) => setOtp(e)}
          />
          <Input
            placeholder="Reason"
            value={reason}
            onChange={(e) => setReason(e.target.value)}
          />
        </Space>
      </Modal>
      <div style={{ padding: 10 }}>
        <Row justify="center">
          <Col push={6}>
            <Space>
              <Button
                type="primary"
                onClick={addSign}
                disabled={otpMutation.isLoading}
              >
                Place Signature
              </Button>
              <Button
                disabled={signs.length === 0}
                loading={otpMutation.isLoading}
                onClick={onSubmit}
              >
                Finish
              </Button>
            </Space>
          </Col>
        </Row>
      </div>
      {signs.length !== 0 && (
        <div style={{ backgroundColor: "#531dab", padding: 2 }}>
          <Row justify="center">
            <Col>
              <div style={{ color: "white" }}>
                <WarningOutlined />
                {`  ${signs.length} sign total. `}
                {signFilter.length !== 0 && (
                  <span>{signFilter.length} at this page.</span>
                )}
              </div>
            </Col>
          </Row>
        </div>
      )}
      <div>
        <Row
          justify="center"
          style={{ zIndex: 1, backgroundColor: "GrayText" }}
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
                  currentPage={documents.currentPage}
                  totalPage={documents.totalPage}
                  onChangePage={changePagination}
                  docUrl={docUrl}
                  loadPageSuccess={loadPageSuccess}
                  changePageDocument={changePageDocument}
                  documents={documents}
                  signFilter={signFilter}
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

export default SelfSign;
