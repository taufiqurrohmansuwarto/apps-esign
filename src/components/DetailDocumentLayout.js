import { DownloadOutlined, FileAddOutlined } from "@ant-design/icons";
import {
  Alert,
  Button,
  Card,
  Dropdown,
  Menu,
  Skeleton,
  Space,
  Tag,
} from "antd";
import { capitalize, startCase } from "lodash";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import Layout from "./Layout";

const menu = (data) => {
  return (
    <Menu>
      <Menu.Item onClick={() => {}}>
        <Space>
          <DownloadOutlined />
          Initial Document
        </Space>
      </Menu.Item>
      <Menu.Item disabled={data?.status !== "completed"} onClick={() => {}}>
        <Space>
          <FileAddOutlined />
          Sign Document
        </Space>
      </Menu.Item>
      <Menu.Item>History Document</Menu.Item>
      <Menu.Item disabled={data?.status !== "completed"}>
        Archieve Document
      </Menu.Item>
    </Menu>
  );
};

const TagDocument = ({ status, workflow }) => {
  let color;

  if (status === "on progress") {
    color = "yellow";
  } else if (status === "completed") {
    color = "green";
  } else if (status === "draft") {
    color = "gray";
  } else if (status === "rejected") {
    color = "red";
  }

  return (
    <>
      <Tag color={color}>{capitalize(status)}</Tag>
      <Tag color="blue">{capitalize(startCase(workflow))}</Tag>
    </>
  );
};

const DropdownMenu = ({ data }) => {
  return (
    <Dropdown key="more" overlay={menu(data)}>
      <Button icon={<DownloadOutlined />}>Download</Button>
    </Dropdown>
  );
};

const DocumentInfo = ({ documentStatus }) => {
  return (
    <Alert
      banner
      type={documentStatus?.descriptionStatus}
      message={documentStatus?.description}
    />
  );
};

const PageContainer = dynamic(
  () => import("@ant-design/pro-layout").then((d) => d?.PageContainer),
  { ssr: false }
);

const DocumentDetail = ({
  document,
  children,
  data,
  status,
  loading,
  documentStatus,
}) => {
  const router = useRouter();

  const handleBack = () => {
    router.push("/documents/list/all");
  };

  return (
    <PageContainer
      fixedHeader
      loading={loading}
      header={{
        title: loading ? (
          <Skeleton.Input size="small" style={{ width: 300 }} />
        ) : (
          document?.title
        ),
      }}
      content={
        loading ? (
          <Skeleton.Input size="small" />
        ) : (
          <DocumentInfo documentStatus={documentStatus} />
        )
      }
      extra={
        loading ? <Skeleton.Input /> : <DropdownMenu data={data} key="more" />
      }
      subTitle={
        loading ? (
          <Skeleton.Input size="small" />
        ) : (
          <TagDocument status={status} workflow={data?.workflow} />
        )
      }
      onTabChange={(routing) => {
        const { documentId } = router?.query;
        router.push(`/documents/${documentId}/${routing}`);
      }}
      tabProps={{ size: "small" }}
      tabActiveKey={router?.pathname?.split("/")?.pop()}
      tabList={[
        { tab: "Dokumen", key: "view" },
        { tab: "Informasi", key: "information" },
        { tab: "Diskusi", key: "discussions" },
        { tab: "Peserta", key: "recipients" },
      ]}
      onBack={handleBack}
      ghost={false}
    >
      <Card>{children}</Card>
    </PageContainer>
  );
};

const DetailDocumentLayout = ({
  children,
  document,
  info,
  status,
  documentStatus,
  loading,
}) => {
  return (
    <Layout>
      <DocumentDetail
        loading={loading}
        documentStatus={documentStatus}
        status={status}
        data={info}
        document={document}
      >
        {children}
      </DocumentDetail>
    </Layout>
  );
};

export default DetailDocumentLayout;
