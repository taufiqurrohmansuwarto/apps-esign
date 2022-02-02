import { Card, Descriptions } from "antd";
import { useSession } from "next-auth/react";
import SettingLayout from "../../src/components/SettingLayout";

const UserInfo = ({ user }) => {
  return (
    <Card>
      <Descriptions title="User Info">
        <Descriptions.Item label="Nama">{user?.name}</Descriptions.Item>
        <Descriptions.Item label="NIP">
          {user?.employee_number}
        </Descriptions.Item>
      </Descriptions>
    </Card>
  );
};

const PersonalInformation = () => {
  const { data, status } = useSession();

  return (
    <SettingLayout>
      <UserInfo user={data?.user} />
    </SettingLayout>
  );
};

PersonalInformation.auth = {
  roles: ["USER"],
};

export default PersonalInformation;
