import Head from "next/head";
import Layout from "../../../src/components/Layout";
import ListDocuments from "../../../src/components/ListDocument";
import NestedLayout from "../../../src/components/NestedLayout";

const Rejected = () => {
  return (
    <>
      <Head>
        <title>Dokumen ditolak</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <ListDocuments type="rejected" />
    </>
  );
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
