import {
  CheckCircleTwoTone,
  CloseCircleTwoTone,
  FileDoneOutlined,
  FileSyncOutlined,
  InteractionOutlined,
  MailOutlined,
  ProfileOutlined,
  QuestionCircleOutlined,
} from "@ant-design/icons";
import { useQuery } from "@tanstack/react-query";
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
import Head from "next/head";
import Link from "next/link";
import Layout from "../src/components/Layout";
import documents from "../src/services/documents";

const { Title } = Typography;

// fucking hardcode
const Greetings = ({ user }) => {
  return (
    <PageHeader ghost={false}>
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

const Status = ({ data, loading }) => {
  return (
    <Skeleton loading={loading}>
      <Space>
        {data?.message === "User tidak terdaftar dalam bsre" ? (
          <>
            <CloseCircleTwoTone twoToneColor="red" />
            <span style={{ color: "red" }}>{data?.message}</span>
          </>
        ) : (
          <>
            <CheckCircleTwoTone twoToneColor="green" />
            <div style={{ color: "green" }}>{data?.message}</div>
          </>
        )}
      </Space>
    </Skeleton>
  );
};

const Dokumen = ({ title, url = "/" }) => {
  return (
    <Link href={url}>
      <a>{title}</a>
    </Link>
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
                title={
                  <Dokumen title="Dokumen Draft" url="/documents/list/draft" />
                }
                value={`${data?.draft}`}
              />
            </Col>
            <Col span={8}>
              <Statistic
                prefix={<FileSyncOutlined />}
                title={
                  <Dokumen
                    title="Dokumen Menunggu"
                    url="/documents/list/pending"
                  />
                }
                value={data?.pending}
              />
            </Col>
            <Col span={8}>
              <Statistic
                prefix={<FileDoneOutlined />}
                title={
                  <Dokumen
                    title="Dokumen Selesai"
                    url="/documents/list/completed"
                  />
                }
                value={data?.completed}
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
  const { data: dashboardData, isLoading } = useQuery(["dashboard"], () =>
    documents.getDashboard()
  );

  const { data: status, isLoading: isLoadingStatus } = useQuery(
    ["status"],
    () => documents.checkStatus(),
    {
      refetchOnWindowFocus: false,
    }
  );

  return (
    <>
      <Head>
        <title>Dasbor E-SIGN</title>
        <link rel="icon" href="/esign/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <Card>
        <Greetings user={data?.user} />
        <Divider />
        <Typography.Title level={5}>Status</Typography.Title>
        <Status data={status} loading={isLoadingStatus} />
        <Divider />
        <DashboardStatistic loading={isLoading} data={dashboardData?.data} />
        <Divider />
        <Row>
          <Col span={12}>
            <div style={{ paddingTop: 10, paddingBottom: 10 }}>
              <Space>
                <Link href="/documents/list/all">
                  <a>
                    <ProfileOutlined /> Lihat Semua dokumen
                  </a>
                </Link>
              </Space>
            </div>
            <div style={{ paddingTop: 10, paddingBottom: 10 }}>
              <Space>
                <Link href="/settings/activity-log">
                  <a>
                    <InteractionOutlined /> Aktivitas
                  </a>
                </Link>
              </Space>
            </div>
            <div style={{ paddingTop: 10, paddingBottom: 10 }}>
              <Link href="/settings/signatures">
                <a>
                  <Space>
                    <FileDoneOutlined /> Stempel
                  </Space>
                </a>
              </Link>
            </div>
            <div style={{ paddingTop: 10, paddingBottom: 10 }}>
              <Link href="/settings/faq">
                <a>
                  <Space>
                    <QuestionCircleOutlined /> Butuh bantuan?
                  </Space>
                </a>
              </Link>
            </div>
          </Col>
        </Row>
      </Card>
    </>
  );
};

Dashboard.auth = {
  roles: ["USER"],
};

Dashboard.getLayout = function getLayout(page) {
  return (
    <Layout active="/dashboard" disableContentMargin={false}>
      {page}
    </Layout>
  );
};

export default Dashboard;
