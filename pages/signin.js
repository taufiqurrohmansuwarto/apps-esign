import { Button, Col, Divider, Row, Typography } from "antd";
import { getProviders, signIn } from "next-auth/react";
import Head from "next/head";
import Link from "next/link";

export default function SignIn({ providers }) {
  return (
    <>
      <Head>
        <meta
          name="description"
          content="Aplikasi Tanda Tangan Elektronik BKD Jatim"
        />
      </Head>
      <Row
        style={{
          height: "100vh",
          display: "flex",
        }}
        align="middle"
        justify="center"
      >
        <Col>
          <Typography.Title>E-Sign</Typography.Title>
          {Object?.values(providers).map((provider) => (
            <div key={provider.name}>
              <Button type="primary" onClick={() => signIn(provider.id)}>
                Masuk dengan akun {provider.name}
              </Button>
            </div>
          ))}
          <Divider />
          <Typography.Text>
            <Link href="/check-document">
              <a>Ingin cek dokumen?</a>
            </Link>
          </Typography.Text>
        </Col>
      </Row>
    </>
  );
}

export async function getServerSideProps() {
  const providers = await getProviders();
  return {
    props: { providers },
  };
}
