import Layout from "../../../src/components/Layout";
import NestedLayout from "../../../src/components/NestedLayout";

const Expired = () => {
  return <div>This will be hard to implement</div>;
};

Expired.getLayout = function getLayout(page) {
  return (
    <Layout>
      <NestedLayout>{page}</NestedLayout>
    </Layout>
  );
};

Expired.auth = {
  roles: ["USER"],
};

export default Expired;
