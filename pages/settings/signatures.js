import { Alert, Card, Divider, Skeleton } from "antd";
import { useQuery } from "@tanstack/react-query";
import SettingLayout from "../../src/components/SettingLayout";
import documents from "../../src/services/documents";
import Layout from "../../src/components/Layout";
import Head from "next/head";

const Signature = () => {
  const { data, isLoading } = useQuery(["stamps"], () => documents.getStamps());

  if (isLoading) {
    return <div>loading...</div>;
  }

  return (
    <>
      <Head>
        <title>Stempel Tanda Tangan</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <Card title="Stempel">
        <Alert
          showIcon
          message="Perlu diperhatikan"
          description="Anda bisa menggunakan stempel yang tergenerate secara otomatis untuk melakukan tanda tangan"
        />
        <Divider />
        <Skeleton loading={isLoading} active>
          <img src={`data:image/jpeg;base64,${data}`} />
        </Skeleton>
      </Card>
    </>
  );
};

Signature.getLayout = function getLayout(page) {
  return (
    <Layout active="/settings/personal-information">
      <SettingLayout>{page}</SettingLayout>
    </Layout>
  );
};

Signature.auth = {
  roles: ["USER"],
};

export default Signature;
