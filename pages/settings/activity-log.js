import { Card } from "antd";
import { useQuery } from "@tanstack/react-query";
import SettingLayout from "../../src/components/SettingLayout";
import documents from "../../src/services/documents";

const Activity = () => {
  const { data, isLoading } = useQuery(["activities"], () =>
    documents.getActivities()
  );

  return (
    <SettingLayout>
      <Card loading={isLoading}>
        <div>{JSON.stringify(data)}</div>
      </Card>
    </SettingLayout>
  );
};

Activity.auth = {
  roles: ["USER"],
};

export default Activity;
