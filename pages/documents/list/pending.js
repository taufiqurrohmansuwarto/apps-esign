import Layout from "../../../src/components/Layout";
import ListDocuments from "../../../src/components/ListDocument";
import NestedLayout from "../../../src/components/NestedLayout";
import Head from "next/head";

const Pending = () => {
  return (
    <>
      <Head>
        <title>Dokumen Menunggu</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <ListDocuments type="waiting" />
    </>
  );
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
