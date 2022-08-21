import Layout from "../../../src/components/Layout";
import NestedLayout from "../../../src/components/NestedLayout";
import Head from "next/head";

const Expired = () => {
  return (
    <>
      <Head>
        <title>Dokumen Kadaluarsa</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <div>This will be hard to implement</div>
    </>
  );
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
