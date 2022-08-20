import { Skeleton, Space, Tag } from "antd";
import dayjs from "dayjs";
import dynamic from "next/dynamic";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import documents from "../services/documents";
import { colorOfItem } from "../utils";

const ProList = dynamic(() => import("@ant-design/pro-list"), { ssr: false });

const Histories = ({ documentId }) => {
  const [query, setQuery] = useState({
    page: 0,
    pageSize: 10,
    documentId,
  });

  const { data, isLoading } = useQuery(
    ["histories", query],
    () => documents.fetchHistories(query),
    {
      enabled: Boolean(query),
    }
  );

  return (
    <Skeleton loading={isLoading} active>
      <ProList
        key="id"
        loading={isLoading}
        dataSource={data?.data?.list}
        pagination={{
          onChange(e) {
            // todo motherfucker
            setQuery({ ...query, page: e - 1 });
          },
          total: data?.meta?.total,
          size: "small",
          showTotal: (total) => <div>Total {total} items</div>,
          defaultPageSize: query?.pageSize,
          showSizeChanger: false,
          defaultCurrent: query?.page + 1,
        }}
        metas={{
          title: {
            render: (_, row) => {
              return (
                <div style={{ minWidth: 300 }}>
                  <Space>
                    {row?.nama}
                    {row?.nip}
                  </Space>
                </div>
              );
            },
          },
          description: {
            render: (_, item) => {
              return (
                <Space>
                  {item.is_owner && <Tag color="blue">Pemilik</Tag>}
                </Space>
              );
            },
          },
          avatar: {
            dataIndex: "picture",
            search: false,
          },
          extra: {
            render: (_, item) => (
              <div
                style={{
                  minWidth: 200,
                  flex: 1,
                  display: "flex",
                  justifyContent: "flex-start",
                }}
              >
                <div
                  style={{
                    width: "200px",
                  }}
                >
                  <Tag color={colorOfItem(item?.action)}>
                    {item?.action?.toUpperCase()}
                  </Tag>
                </div>
                <div
                  style={{
                    width: "200px",
                  }}
                >
                  {dayjs(item.created_at).format("DD MMM, YYYY HH:mm")}
                </div>
              </div>
            ),
          },
        }}
      />
    </Skeleton>
  );
};

export default Histories;
