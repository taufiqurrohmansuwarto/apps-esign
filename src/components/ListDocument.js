import {
  DownloadOutlined,
  EllipsisOutlined,
  FilePdfTwoTone,
  VerifiedOutlined,
} from "@ant-design/icons";
import {
  Avatar,
  Button,
  ConfigProvider,
  Dropdown,
  Input,
  Menu,
  Tag,
  Tooltip,
  Typography,
} from "antd";
import enUs from "antd/lib/locale/en_US";
import dayjs from "dayjs";
import { saveAs } from "file-saver";
import { capitalize, startCase } from "lodash";
import dynamic from "next/dynamic";
import Link from "next/link";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import documents from "../services/documents";
import { documentStatus, recipientStatus } from "../utils";

const ProList = dynamic(() => import("@ant-design/pro-list"), { ssr: false });

const TagStatus = ({ status, workflow, role, signatory_status }) => {
  const { kata, color } = documentStatus({
    status,
    workflow,
    role,
    signatory_status,
  });

  return <Tag color={color}>{kata?.toUpperCase()}</Tag>;
};

const ActionMenu = ({ documentId, document }) => {
  const [loadingInitial, setLoadingInitial] = useState(false);
  const [loadingSign, setLoadingSign] = useState(false);

  const getInitialDocument = async () => {
    setLoadingInitial(true);
    const type = "initial";
    const result = await documents.getDocumentFile(documentId, type);
    const currentDocument = result?.data;
    const res = await fetch(`data:application/pdf;base64,${currentDocument}`);
    setLoadingInitial(false);
    const blob = await res.blob();
    saveAs(blob, `${document?.initial_document}.pdf`);
  };

  const getSignDocument = async () => {
    setLoadingSign(true);
    const type = "sign";
    const result = await documents.getDocumentFile(documentId, type);
    const currentDocument = result?.data;
    const res = await fetch(`data:application/pdf;base64,${currentDocument}`);
    const blob = await res.blob();
    saveAs(blob, `${document?.sign_document}.pdf`);
    setLoadingSign(false);
  };

  return (
    <Menu>
      <Menu.Item
        onClick={getInitialDocument}
        key="initial"
        icon={<DownloadOutlined />}
        disabled={loadingInitial}
      >
        Initial Document
      </Menu.Item>
      {document?.sign_document && (
        <Menu.Item
          onClick={getSignDocument}
          key="sign"
          icon={<VerifiedOutlined />}
          disabled={loadingSign}
        >
          Sign
        </Menu.Item>
      )}
    </Menu>
  );
};

const ActionDropdown = ({ documentId, document }) => {
  return (
    <Dropdown
      overlay={<ActionMenu documentId={documentId} document={document} />}
    >
      <Button icon={<EllipsisOutlined />} />
    </Dropdown>
  );
};

const MyToolTip = ({ recipient }) => {
  return (
    <>
      <Typography.Paragraph ellipsis>{recipient?.name} </Typography.Paragraph>
      <Tag color={recipientStatus(recipient)?.color}>
        {recipientStatus(recipient)?.kata}
      </Tag>
    </>
  );
};

const ListDocuments = ({ type = "all" }) => {
  const [query, setQuery] = useState({
    type,
    page: 1,
    pageSize: 10,
  });

  const { data, isLoading } = useQuery(
    ["documents", query],
    async () => documents.getDocuments(query),
    {
      enabled: Boolean(query),
      refetchOnWindowFocus: false,
    }
  );

  return (
    <ConfigProvider locale={enUs}>
      <ProList
        rowKey="id"
        loading={isLoading}
        headerTitle={`${capitalize(type)} Documents`}
        locale={{
          emptyText: "Tidak ada",
          cancelSort: "Batal Urut",
          filterEmptyText: "Empty Text",
        }}
        request={async (params = {}) => {
          const currentParams = {
            page: params?.current,
            pageSize: params?.pageSize,
            title: params?.title,
          };

          setQuery({ ...query, ...currentParams });
        }}
        dataSource={data?.data?.list}
        size="small"
        metas={{
          title: {
            title: "Title",
            formItemProps: (_, { fieldProps }) => <Input {...fieldProps} />,
            render: (_, row) => (
              <div style={{ width: 500 }}>
                <Link href={`/documents/${row?.document_id}/view`}>
                  <a>{row?.title}.pdf</a>
                </Link>
              </div>
            ),
          },
          actions: {
            render: (_, row) => {
              const { ongoing_document, sign_document, initial_document } = row;
              const document = {
                ongoing_document,
                sign_document,
                initial_document,
              };
              return (
                <div>
                  <ActionDropdown
                    documentId={row?.document_id}
                    document={document}
                  />
                </div>
              );
            },
          },
          avatar: {
            search: false,
            render: (_, row) => (
              <Button
                onClick={() => alert(JSON.stringify(row))}
                icon={<FilePdfTwoTone />}
                size="small"
                shape="square"
              />
            ),
          },
          description: {
            search: false,
            render: (_, item) => {
              return (
                <div>
                  <Tag>{startCase(item.workflow)}</Tag>
                </div>
              );
            },
          },
          content: {
            search: false,
            render: (_, item) => (
              <div
                style={{
                  minWidth: 500,
                  flex: 1,
                  alignContent: "flex-start",
                  display: "flex",
                  justifyContent: "space-around",
                }}
              >
                <div>
                  <div>
                    {dayjs(item?.upload_date)
                      .locale("id")
                      .format("DD MMM, YYYY HH:mm")}
                  </div>
                </div>
                <div>
                  <Avatar.Group maxCount={3}>
                    {item.recipients.map((recipient) => (
                      <Tooltip
                        color="white"
                        key={recipient.id}
                        title={<MyToolTip recipient={recipient} />}
                      >
                        <Avatar src={recipient?.profile_picture} />
                      </Tooltip>
                    ))}
                  </Avatar.Group>
                </div>
                <div>
                  <TagStatus
                    workflow={item.workflow}
                    status={item.status}
                    role={item?.role}
                    signatory_status={item?.signatory_status}
                  />
                </div>
              </div>
            ),
          },
        }}
        pagination={{
          total: data?.meta?.total,
          size: "small",
          showTotal: (total) => <div>Total {total} items</div>,
          defaultPageSize: 10,
          showSizeChanger: false,
        }}
        search={{
          searchText: "Cari",
          resetText: "Reset",
        }}
      />
    </ConfigProvider>
  );
};

export default ListDocuments;
