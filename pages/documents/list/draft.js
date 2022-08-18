import Layout from "../../../src/components/Layout";
import ListDocuments from "../../../src/components/ListDocument";
import NestedLayout from "../../../src/components/NestedLayout";

const Draft = () => {
  return <ListDocuments type="draft" />;
};

Draft.getLayout = function getLayout(page) {
  return (
    <Layout>
      <NestedLayout>{page}</NestedLayout>
    </Layout>
  );
};

Draft.auth = {
  roles: ["USER"],
};

export default Draft;
