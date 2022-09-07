import { Space, Button, Col, Divider, Row, Typography } from "antd";
import { getProviders, signIn } from "next-auth/react";
import Head from "next/head";
import Image from "next/image";
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
        // gutter={[48, 48]}
        style={{ minHeight: "100vh" }}
        justify="center"
      >
        <Col xs={{ span: 24 }} md={{ span: 12 }}>
          <Image
            src="https://siasn.bkd.jatimprov.go.id:9000/public/images.jpg"
            layout="fill"
            objectFit="cover"
          />
        </Col>

        <Col xs={{ span: 24 }} md={{ span: 12 }}>
          <Typography.Title>E-Sign</Typography.Title>
          {Object?.values(providers).map((provider) => (
            <div key={provider.name}>
              <Button type="primary" onClick={() => signIn(provider.id)}>
                Masuk dengan akun {provider.name}
              </Button>
            </div>
          ))}
          <Divider />
          <Space>
            <Typography.Text>
              <Link href="/check-document">
                <a>Ingin cek dokumen?</a>
              </Link>
            </Typography.Text>

            <Image
              src="https://siasn.bkd.jatimprov.go.id:9000/public/logobkd.jpg"
              width="30%"
              height="30%"
              objectFit="contain"
            />
            <Image
              src="https://siasn.bkd.jatimprov.go.id:9000/public/pemprov.png"
              width="30%"
              height="30%"
              objectFit="contain"
            />
          </Space>
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
