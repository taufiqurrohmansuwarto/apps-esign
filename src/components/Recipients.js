import { QuestionCircleFilled } from "@ant-design/icons";
import {
  Button,
  Card,
  Col,
  Empty,
  Row,
  Skeleton,
  Space,
  Tag,
  Tooltip,
} from "antd";
import dynamic from "next/dynamic";
import { useQuery } from "@tanstack/react-query";
import documents from "../services/documents";
import { documentStatus, isNoRecipientsForRequestFromOthers } from "../utils";

const ProList = dynamic(() => import("@ant-design/pro-list"), { ssr: false });

const Loading = () => (
  <Row justify="center" align="middle" style={{ padding: 18 }}>
    <Col span={18}>
      <Card>
        <Skeleton paragraph={{ rows: 1, width: 100 }} />
        <Skeleton avatar />
      </Card>
    </Col>
  </Row>
);

const RenderNothing = () => {
  return (
    <Row justify="center" align="middle">
      <Col>
        <Empty description="Sepertinya anda belum menambahkan peserta ke dalam alur dokumen. Silahkan ke dokumen tab untuk menambahkan peserta">
          <Button type="primary">Ke tab dokumen</Button>
        </Empty>
      </Col>
    </Row>
  );
};

const Recipients = ({ documentId }) => {
  const { data: documentData, isLoading } = useQuery(
    ["recipients", documentId],
    () => documents.getRecipients(documentId)
  );

  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      {isNoRecipientsForRequestFromOthers(documentData) ? (
        <RenderNothing />
      ) : (
        <Card style={{ width: "100%" }} title="Recipient">
          <Space>
            <span>{documentData?.type}</span>
            <br />
            {documentData?.type === "serial" ? (
              <>
                <Tooltip title="Recipients will sign the document based on signing sequence">
                  <QuestionCircleFilled />
                </Tooltip>
              </>
            ) : (
              <>
                <Tooltip title="Recipients will sign document freely without sequence">
                  <QuestionCircleFilled />
                </Tooltip>
              </>
            )}
          </Space>
          <>
            <ProList
              rowKey="id"
              size="large"
              dataSource={documentData?.recipients?.filter(
                (d) => d?.role !== null
              )}
              metas={{
                title: {
                  render: (_, row) => {
                    return <div style={{ minWidth: 200 }}>{row?.name}</div>;
                  },
                },
                description: {
                  render: (_, row) => {
                    return (
                      <div
                        style={{
                          minWidth: 500,
                        }}
                      >
                        {row?.nip}
                      </div>
                    );
                  },
                },
                avatar: {
                  dataIndex: "profile_picture",
                },
                subTitle: {
                  render: (_, item) => {
                    const { kata, color } = documentStatus(item);
                    return (
                      <Space size={0}>
                        <Tag color={color}>{kata?.toUpperCase()}</Tag>
                        <Tag color={color}>{item?.role?.toUpperCase()}</Tag>
                      </Space>
                    );
                  },
                },
              }}
            />
          </>
        </Card>
      )}
    </>
  );
};

export default Recipients;
