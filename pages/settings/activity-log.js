import { Card, Table } from "antd";
import { useQuery } from "@tanstack/react-query";
import SettingLayout from "../../src/components/SettingLayout";
import documents from "../../src/services/documents";
import Layout from "../../src/components/Layout";
import Head from "next/head";

const Activity = () => {
  const { data, isLoading } = useQuery(["activities"], () =>
    documents.getActivities()
  );

  const columns = [
    { title: "Judul", dataIndex: "type", key: "type" },
    { title: "Tipe", dataIndex: "type", key: "type" },
    { title: "Aksi", dataIndex: "action", key: "action" },
    { title: "Info", dataIndex: "useragent", key: "useragent" },
    { title: "Alamat IP", dataIndex: "ip_address", key: "ip_address" },
  ];

  return (
    <>
      <Head>
        <title>Riwayat Aktivitas</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <Card title="Log Aktivitas">
        <Table
          size="small"
          columns={columns}
          loading={isLoading}
          rowKey={(row) => row?.id}
          dataSource={data?.data}
          pagination={{
            total: data?.meta?.total,
            pageSize: 20,
          }}
        />
      </Card>
    </>
  );
};

Activity.getLayout = function getLayout(page) {
  return (
    <Layout active="/settings/personal-information">
      <SettingLayout>{page}</SettingLayout>
    </Layout>
  );
};

Activity.auth = {
  roles: ["USER"],
};

export default Activity;
