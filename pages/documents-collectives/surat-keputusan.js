import Layout from "../../src/components/Layout";
import NestedLayout from "../../src/components/NestedLayout";

const SuratKeputusan = () => {
  return <div>Akan diisi surat keputusan yang diajukan</div>;
};

SuratKeputusan.getLayout = function getLayout(page) {
  return (
    <Layout active="/documents-collectives/request">
      <NestedLayout active="/documents-collectives/request">
        {page}
      </NestedLayout>
    </Layout>
  );
};

SuratKeputusan.auth = {
  roles: ["USER"],
};

export default SuratKeputusan;
