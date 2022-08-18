import { Alert, Card, Divider, Skeleton } from "antd";
import { useQuery } from "@tanstack/react-query";
import SettingLayout from "../../src/components/SettingLayout";
import documents from "../../src/services/documents";

const Signature = () => {
  const { data, isLoading } = useQuery(["stamps"], () => documents.getStamps());

  if (isLoading) {
    return <div>loading...</div>;
  }

  return (
    <SettingLayout>
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
    </SettingLayout>
  );
};

Signature.auth = {
  roles: ["USER"],
};

export default Signature;
