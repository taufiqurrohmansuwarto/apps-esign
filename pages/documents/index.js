import { Button, Result } from "antd";
import { useRouter } from "next/router";
import Layout from "../../src/components/Layout";
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

Documents.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

Documents.auth = {
  roles: ["USER"],
};

export default Documents;
