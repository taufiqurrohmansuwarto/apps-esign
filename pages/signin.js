import { Button, Col, Divider, Row, Space, Typography } from "antd";
import { getProviders, signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";

export default function SignIn({ providers }) {
  const router = useRouter();

  const handleCheckdocument = () => {
    router.push("/check-document");
  };

  return (
    <>
      <Row
        style={{
          height: "100vh",
          display: "flex",
        }}
        align="middle"
        justify="center"
      >
        <Col>
          <Typography.Title>E-sign BKD</Typography.Title>
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
              <a>Check document?</a>
            </Link>
          </Typography.Text>
        </Col>
      </Row>
    </>
  );
}

// This is the recommended way for Next.js 9.3 or newer
export async function getServerSideProps() {
  const providers = await getProviders();
  return {
    props: { providers },
  };
}
