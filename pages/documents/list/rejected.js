import Layout from "../../../src/components/Layout";
import ListDocuments from "../../../src/components/ListDocument";
import NestedLayout from "../../../src/components/NestedLayout";

const Rejected = () => {
  return <ListDocuments type="rejected" />;
};

Rejected.getLayout = function getLayout(page) {
  return (
    <Layout>
      <NestedLayout>{page}</NestedLayout>
    </Layout>
  );
};

Rejected.auth = {
  roles: ["USER"],
};

export default Rejected;
