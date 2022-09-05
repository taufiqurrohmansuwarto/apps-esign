import Layout from "../../../src/components/Layout";
import ListDocuments from "../../../src/components/ListDocument";
import NestedLayout from "../../../src/components/NestedLayout";
import Head from "next/head";

const Draft = () => {
  return (
    <>
      <Head>
        <title>Dokumen Draft</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <ListDocuments type="draft" />
    </>
  );
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
