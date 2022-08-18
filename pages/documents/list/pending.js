import Layout from "../../../src/components/Layout";
import ListDocuments from "../../../src/components/ListDocument";
import NestedLayout from "../../../src/components/NestedLayout";

const Pending = () => {
  return <ListDocuments type="waiting" />;
};

Pending.getLayout = function getLayout(page) {
  return (
    <Layout>
      <NestedLayout>{page}</NestedLayout>
    </Layout>
  );
};

Pending.auth = {
  roles: ["USER"],
};

export default Pending;
