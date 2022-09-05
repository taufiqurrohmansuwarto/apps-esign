import Layout from "../../../src/components/Layout";
import ListDocuments from "../../../src/components/ListDocument";
import NestedLayout from "../../../src/components/NestedLayout";
import Head from "next/head";

const Done = () => {
  return (
    <>
      <Head>
        <title>Dokumen Selesai</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <ListDocuments type="completed" />
    </>
  );
};

Done.getLayout = function getLayout(page) {
  return (
    <Layout>
      <NestedLayout>{page}</NestedLayout>
    </Layout>
  );
};

Done.auth = {
  roles: ["USER"],
};

export default Done;
