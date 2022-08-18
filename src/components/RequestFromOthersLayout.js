import { Card, Steps } from "antd";
import dynamic from "next/dynamic";

const PageContainer = dynamic(
  () => import("@ant-design/pro-layout").then((r) => r?.PageContainer),
  { ssr: false }
);

const StepRequestFromOthers = ({ step = 0 }) => {
  return (
    <div
      style={{
        marginBottom: 16,
        marginTop: 16,
        paddingLeft: 16,
        paddingRight: 16,
      }}
    >
      <Steps size="small" current={step}>
        <Steps.Step title="Unggah dokumen" />
        <Steps.Step title="Tambahkan Peserta" />
        <Steps.Step title="Selesai" />
      </Steps>
    </div>
  );
};

function RequestFromOthersUploadLayout({ step = 0, children }) {
  return (
    <>
      <PageContainer
        subTitle="Alur Pengajuan Dokumen"
        fixedHeader
        onBack={() => window.history.back()}
        title="Permintaan kepada orang lain"
      />
      <div style={{ paddingLeft: 24, paddingRight: 24 }}>
        <StepRequestFromOthers step={step} />
        <Card>{children}</Card>
      </div>
    </>
  );
}

export default RequestFromOthersUploadLayout;
