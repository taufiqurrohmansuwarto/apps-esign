import { Button, Result } from "antd";
import { useRouter } from "next/router";
import NestedLayout from "../../src/components/NestedLayout";

const Documents = () => {
  const router = useRouter();

  const handleGotoDocument = () => {
    router.push("/documents/list/all");
  };

  return (
    <NestedLayout>
      <Result
        title="Documents"
        subTitle="All Your Documents can be access here"
        extra={
          <Button type="primary" onClick={handleGotoDocument}>
            Show Documents
          </Button>
        }
      />
    </NestedLayout>
  );
};

Documents.auth = {
  roles: ["USER"],
};

export default Documents;
