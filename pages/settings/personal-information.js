import { Card, Descriptions } from "antd";
import { useSession } from "next-auth/react";
import Head from "next/head";
import Layout from "../../src/components/Layout";
import SettingLayout from "../../src/components/SettingLayout";

const UserInfo = ({ user }) => {
  return (
    <>
      <Head>
        <title>Informasi Individu</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <Card>
        <Descriptions title="User Info">
          <Descriptions.Item label="Nama">{user?.name}</Descriptions.Item>
          <Descriptions.Item label="NIP">
            {user?.employee_number}
          </Descriptions.Item>
        </Descriptions>
      </Card>
    </>
  );
};

const PersonalInformation = () => {
  const { data } = useSession();

  return <UserInfo user={data?.user} />;
};

PersonalInformation.getLayout = function getLayout(page) {
  return (
    <Layout active="/settings/personal-information">
      <SettingLayout>{page}</SettingLayout>
    </Layout>
  );
};

PersonalInformation.auth = {
  roles: ["USER"],
};

export default PersonalInformation;
