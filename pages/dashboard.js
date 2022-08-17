import {
  FileDoneOutlined,
  FileSyncOutlined,
  InteractionOutlined,
  MailOutlined,
  ProfileOutlined,
  QuestionCircleOutlined,
} from "@ant-design/icons";
import {
  Avatar,
  Card,
  Col,
  Divider,
  PageHeader,
  Row,
  Skeleton,
  Space,
  Statistic,
  Typography,
} from "antd";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import Layout from "../src/components/Layout";
import documents from "../src/services/documents";

const { Title } = Typography;

// fucking hardcode
const Greetings = ({ user }) => {
  return (
    <PageHeader ghost={false} title="Dashboard">
      <Row gutter={[32, 16]}>
        <Col>
          <Avatar size={80} src={user?.image} />
        </Col>
        <Col>
          <Row>
            <Title level={4}>Selamat datang kembali, {user?.name}</Title>
          </Row>

          <Row>
            <p>{user?.employee_number}</p>
          </Row>
        </Col>
      </Row>
    </PageHeader>
  );
};

const DashboardStatistic = ({ data, loading }) => {
  return (
    <Skeleton loading={loading} active>
      <Row>
        <Col span={12}>
          <Row>
            <Col span={8}>
              <Statistic
                prefix={<MailOutlined />}
                title="Document Draft"
                value={`${data?.draft}`}
              />
            </Col>
            <Col span={8}>
              <Statistic
                prefix={<FileDoneOutlined />}
                title="Document Completed"
                value={data?.completed}
              />
            </Col>
            <Col span={8}>
              <Statistic
                prefix={<FileSyncOutlined />}
                title="Document Pending"
                value={data?.pending}
              />
            </Col>
          </Row>
        </Col>
      </Row>
    </Skeleton>
  );
};

const Dashboard = () => {
  const { data } = useSession();
  const { data: dashboardData, isLoading } = useQuery("dashboard", () =>
    documents.getDashboard()
  );
  return (
    <Layout>
      <Card>
        <Greetings user={data?.user} />
        <Divider />
        <DashboardStatistic loading={isLoading} data={dashboardData?.data} />
        <Divider />
        <Row>
          <Col span={12}>
            <div style={{ paddingTop: 10, paddingBottom: 10 }}>
              <Space>
                <Link href="/documents/list/all">
                  <a>
                    <ProfileOutlined /> View All Document
                  </a>
                </Link>
              </Space>
            </div>
            <div style={{ paddingTop: 10, paddingBottom: 10 }}>
              <Space>
                <Link href="/settings/activity-log">
                  <a>
                    <InteractionOutlined /> Activities
                  </a>
                </Link>
              </Space>
            </div>
            <div style={{ paddingTop: 10, paddingBottom: 10 }}>
              <Link href="/settings/signature">
                <a>
                  <Space>
                    <FileDoneOutlined /> Signature
                  </Space>
                </a>
              </Link>
            </div>
            <div style={{ paddingTop: 10, paddingBottom: 10 }}>
              <Link href="/settings/faq">
                <a>
                  <Space>
                    <QuestionCircleOutlined /> Need Help?
                  </Space>
                </a>
              </Link>
            </div>
          </Col>
        </Row>
      </Card>
    </Layout>
  );
};

Dashboard.auth = {
  roles: ["USER"],
};

export default Dashboard;
