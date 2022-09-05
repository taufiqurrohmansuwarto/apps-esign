import Layout from "../../../src/components/Layout";
import ListDocuments from "../../../src/components/ListDocument";
import NestedLayout from "../../../src/components/NestedLayout";
import Head from "next/head";

const Archieved = () => {
  return (
    <>
      <Head>
        <title>Dokumen Arsip</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <ListDocuments type="archieved" />
    </>
  );
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
