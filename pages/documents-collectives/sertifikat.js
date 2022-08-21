import Layout from "../../src/components/Layout";
import NestedLayout from "../../src/components/NestedLayout";

const Sertifikat = () => {
  return <div>Akan diisi daftar sertifikat yang sudah diajukan</div>;
};

Sertifikat.getLayout = function getLayout(page) {
  return (
    <Layout active="/documents-collectives/request">
      <NestedLayout active="/documents-collectives/request">
        {page}
      </NestedLayout>
    </Layout>
  );
};

Sertifikat.auth = {
  roles: ["USER"],
};

export default Sertifikat;
