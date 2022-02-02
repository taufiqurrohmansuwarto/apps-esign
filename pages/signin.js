import { Button, Col, Row, Space, Typography } from "antd";
import { getProviders, signIn } from "next-auth/react";

export default function SignIn({ providers }) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minWidth: "100vh",
        paddingTop: "6rem",
      }}
    >
      <Row align="middle">
        <Col>
          <Typography.Title>Esign</Typography.Title>
          <Space direction="vertical">
            {Object?.values(providers).map((provider) => (
              <div key={provider.name}>
                <Button type="primary" onClick={() => signIn(provider.id)}>
                  Masuk dengan akun {provider.name}
                </Button>
              </div>
            ))}
          </Space>
        </Col>
      </Row>
    </div>
  );
}

// This is the recommended way for Next.js 9.3 or newer
export async function getServerSideProps() {
  const providers = await getProviders();
  return {
    props: { providers },
  };
}
