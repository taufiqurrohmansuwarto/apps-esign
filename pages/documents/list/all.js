import Head from "next/head";
import Layout from "../../../src/components/Layout";
import ListDocuments from "../../../src/components/ListDocument";
import NestedLayout from "../../../src/components/NestedLayout";

const List = () => {
  return (
    <>
      <Head>
        <title>Semua Dokumen</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <ListDocuments />
    </>
  );
};

List.getLayout = function getLayout(page) {
  return (
    <Layout>
      <NestedLayout>{page}</NestedLayout>
    </Layout>
  );
};

List.auth = {
  roles: ["USER"],
};

export default List;
