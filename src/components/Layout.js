import { LogoutOutlined, SettingOutlined } from "@ant-design/icons";
import { Avatar, Dropdown, Menu, Space } from "antd";
import { signOut, useSession } from "next-auth/react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { useRouter } from "next/router";
import mainRoutes from "../routes/main-routes";
import BadgeNotifications from "./BadgeNotifications";
import ButtonCreate from "./ButtonCreate";

const ProLayout = dynamic(() => import("@ant-design/pro-layout"), {
  ssr: false,
});

const handleSignout = () => {
  signOut();
};

const gotoSettings = (router) => () => {
  router.push("/settings/personal-information");
};

const menu = (router) => (
  <Menu>
    <Menu.Item
      key="pengaturan"
      onClick={gotoSettings(router)}
      icon={<SettingOutlined />}
    >
      Pengaturan
    </Menu.Item>

    <Menu.Item key="logout" onClick={handleSignout} icon={<LogoutOutlined />}>
      Keluar
    </Menu.Item>
  </Menu>
);

// create menu dashboard, documents, contacts

const rightContentRender = (data, router) => {
  const gotoNotifications = () => {
    router.push("/notifications");
  };

  return (
    <Space size="large">
      <Space>
        <div style={{ cursor: "pointer" }} onClick={gotoNotifications}>
          <BadgeNotifications />
        </div>
      </Space>

      <Space align="center">
        <Dropdown overlay={menu(router)}>
          <Avatar style={{ cursor: "pointer" }} src={data?.user?.image} />
        </Dropdown>
      </Space>
    </Space>
  );
};

const menuItemRender = (options, element) => {
  return (
    <Link href={`${options.path}`}>
      <a>{element}</a>
    </Link>
  );
};

function Layout({
  children,
  title = "E-SIGN",
  active = "/documents/list/all",
  disableContentMargin = true,
}) {
  const { data, status } = useSession();
  const router = useRouter();

  return (
    <ProLayout
      route={mainRoutes}
      collapsed
      navTheme="dark"
      style={{ minHeight: "100vh" }}
      disableContentMargin={disableContentMargin}
      menuHeaderRender={() => <ButtonCreate />}
      menuItemRender={menuItemRender}
      selectedKeys={[active]}
      rightContentRender={() => rightContentRender(data, router)}
      title={title}
      theme="dark"
      fixSiderbar
      loading={status === "loading"}
      collapsedButtonRender={false}
    >
      {children}
    </ProLayout>
  );
}

export default Layout;
