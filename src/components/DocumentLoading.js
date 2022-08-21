import { Row, Space, Card, Skeleton } from "antd";
const DocumentLoading = () => {
  return (
    <Row
      justify="center"
      align="middle"
      style={{ padding: 18, backgroundColor: "GrayText" }}
    >
      <Card style={{ width: 600, height: 800 }}>
        <Skeleton avatar={{ size: 100 }} active />
        <Skeleton paragraph active />
        <Skeleton paragraph active />
        <Row justify="center" align="middle">
          <Space size="large">
            <Skeleton.Image size="large" active />
            <Skeleton.Image size="large" active />
            <Skeleton.Image size="large" active />
          </Space>
        </Row>
        <Skeleton paragraph active />
      </Card>
    </Row>
  );
};

export default DocumentLoading;
