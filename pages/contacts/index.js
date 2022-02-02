import { Card, Result } from "antd";
import dynamic from "next/dynamic";
import Layout from "../../src/components/Layout";

const PageContainer = dynamic(
  () => import("@ant-design/pro-layout").then((d) => d?.PageContainer),
  { ssr: false }
);

const Contacts = () => {
  return (
    <Layout>
      <PageContainer title="Contacts" content="Under construction">
        <Card>
          <Result status="warning" title="Lagi dibuatkan sabar ya... :(" />
        </Card>
      </PageContainer>
    </Layout>
  );
};

export default Contacts;
