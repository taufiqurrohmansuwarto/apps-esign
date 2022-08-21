import Layout from "../../src/components/Layout";
import NestedLayout from "../../src/components/NestedLayout";

const Request = () => {
  return <div>Akan diisi permintaan dokumen</div>;
};

Request.getLayout = function getLayout(page) {
  return (
    <Layout active="/documents-collectives/request">
      <NestedLayout active="/documents-collectives/request">
        {page}
      </NestedLayout>
    </Layout>
  );
};

Request.auth = {
  roles: ["USER"],
};

export default Request;
