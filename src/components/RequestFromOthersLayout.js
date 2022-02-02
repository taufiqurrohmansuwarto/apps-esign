import { Card, Steps } from "antd";
import dynamic from "next/dynamic";
import Layout from "./Layout";

const PageContainer = dynamic(
  () => import("@ant-design/pro-layout").then((r) => r?.PageContainer),
  { ssr: false }
);

const StepRequestFromOthers = ({ step = 0 }) => {
  return (
    <div style={{ marginBottom: 16, marginTop: 16 }}>
      <Steps size="small" current={step}>
        <Steps.Step title="Upload Document" />
        <Steps.Step title="Add Recipients" />
        <Steps.Step title="Finish" />
      </Steps>
    </div>
  );
};

function RequestFromOthersUploadLayout({ step = 0, children }) {
  return (
    <Layout>
      <PageContainer
        subTitle="Workflow"
        fixedHeader
        title="Request From Others"
      />
      <StepRequestFromOthers step={step} />
      <Card>{children}</Card>
    </Layout>
  );
}

export default RequestFromOthersUploadLayout;
