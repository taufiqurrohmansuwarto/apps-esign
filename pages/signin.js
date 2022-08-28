import { Button, Col, Divider, Layout, Row, Typography } from "antd";
import { getProviders, signIn } from "next-auth/react";
import Link from "next/link";

export default function SignIn({ providers }) {
  return (
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
  );
}

// This is the recommended way for Next.js 9.3 or newer
export async function getServerSideProps() {
  const providers = await getProviders();
  return {
    props: { providers },
  };
}
