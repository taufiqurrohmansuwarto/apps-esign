import { Card } from "antd";
import Head from "next/head";
import Layout from "../src/components/Layout";

const Notifications = () => {
  return (
    <>
      <Head>
        <title>Notifikasi</title>
      </Head>
      <Card title="Notifikasi"></Card>
    </>
  );
};

Notifications.auth = {
  roles: ["USER"],
};

Notifications.getLayout = function getLayout(page) {
  return (
    <Layout active="/notifications" disableContentMargin={false}>
      {page}
    </Layout>
  );
};

export default Notifications;
