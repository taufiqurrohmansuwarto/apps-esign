import Layout from "../../../src/components/Layout";
import ListDocuments from "../../../src/components/ListDocument";
import NestedLayout from "../../../src/components/NestedLayout";

const Archieved = () => {
  return <ListDocuments type="archieved" />;
};

Archieved.getLayout = function getLayout(page) {
  return (
    <Layout>
      <NestedLayout>{page}</NestedLayout>
    </Layout>
  );
};

Archieved.auth = {
  roles: ["USER"],
};

export default Archieved;
