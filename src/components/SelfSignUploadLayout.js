import { Card, Steps } from "antd";
import dynamic from "next/dynamic";
import Layout from "./Layout";

const PageContainer = dynamic(
  () => import("@ant-design/pro-layout").then((r) => r?.PageContainer),
  { ssr: false }
);

const StepSelfSign = ({ step = 0 }) => {
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
        <Steps.Step title="Unggah Dokumen" />
        <Steps.Step title="Tempatkan tanda tangan" />
        <Steps.Step title="Selesai" />
      </Steps>
    </div>
  );
};

function SelfSignUploadLayout({ step = 0, children }) {
  return (
    <Layout>
      <PageContainer subTitle="Workflow" fixedHeader title="Self Sign" />
      <StepSelfSign step={step} />
      <div style={{ paddingLeft: 8, paddingRight: 8 }}>
        <Card>{children}</Card>
      </div>
    </Layout>
  );
}

export default SelfSignUploadLayout;
