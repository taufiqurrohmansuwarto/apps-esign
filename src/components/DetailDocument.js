import { Avatar, Card, Descriptions, Space, Tag, Typography } from "antd";
import dayjs from "dayjs";
import { useQuery } from "@tansack/react-query";
import documents from "../services/documents";
import Histories from "./Histories";

const SignInformation = ({ sign }) => {
  return (
    <>
      <Descriptions key={sign.id} bordered size="small" layout="vertical">
        <Descriptions.Item label="Sign Page">
          {sign?.sign_pages}
        </Descriptions.Item>
        <Descriptions.Item label="Timestamp">
          {dayjs(sign?.approval_date).format("MMM DD, YYYY hh:mm")}
        </Descriptions.Item>
        <Descriptions.Item label="Reason">{sign?.reason}</Descriptions.Item>
        <Descriptions.Item label="Ip Address">
          {sign?.ip_address}
        </Descriptions.Item>
        <Descriptions.Item label="Device">{sign?.device}</Descriptions.Item>
        <Descriptions.Item label="Properties">
          {JSON.stringify(sign?.sign_coordinate)}
        </Descriptions.Item>
      </Descriptions>
    </>
  );
};

const DetailDocument = ({ documentId }) => {
  const { data, isLoading } = useQuery("detail_document", () =>
    documents.detailDocument(documentId)
  );

  if (isLoading) {
    return <div>loading..</div>;
  }

  return (
    <Card>
      <Typography.Title level={5}>Details</Typography.Title>
      <Descriptions bordered size="small" layout="vertical">
        <Descriptions.Item label="Title">{data?.title}</Descriptions.Item>
        <Descriptions.Item label="Uploaded Date">
          {dayjs(data?.upload_date).format("DD MMM, YYYY HH:mm")}
        </Descriptions.Item>
        <Descriptions.Item label="Document Pages">
          {data?.document_pages}
        </Descriptions.Item>
        <Descriptions.Item label="Owner">
          <Space>
            <Avatar src={data?.profile_picture} />
            <div>{data?.owner}</div>
            <Tag color="green">{data?.nip}</Tag>
          </Space>
        </Descriptions.Item>
      </Descriptions>
      <br />
      <br />
      {data?.sign_information && (
        <>
          <Typography.Title level={5}>My Signature</Typography.Title>
          <SignInformation sign={data?.sign_information} />
        </>
      )}
      <br />
      <br />
      <Typography.Title level={5}>History</Typography.Title>
      <Histories documentId={documentId} />
    </Card>
  );
};

export default DetailDocument;
