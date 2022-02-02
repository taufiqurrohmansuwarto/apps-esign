import { LogoutOutlined, SettingOutlined } from "@ant-design/icons";
import { Avatar, Dropdown, Menu, Space } from "antd";
import { signOut, useSession } from "next-auth/react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { useRouter } from "next/router";
import mainRoutes from "../routes/main-routes";
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
      key="logut"
      onClick={gotoSettings(router)}
      icon={<SettingOutlined />}
    >
      Settings
    </Menu.Item>

    <Menu.Item key="logut" onClick={handleSignout} icon={<LogoutOutlined />}>
      Logout
    </Menu.Item>
  </Menu>
);

// create menu dashboard, documents, contacts

const menuItemRender = (options, element) => {
  return (
    <Link href={`${options.path}`}>
      <a>{element}</a>
    </Link>
  );
};

function Layout({ children, title = "E-SIGN" }) {
  const { data, status } = useSession();
  const router = useRouter();

  const active = `/${router?.asPath?.split("/")?.[1]}`;

  return (
    <ProLayout
      route={mainRoutes}
      collapsed
      navTheme="dark"
      style={{ minHeight: "100vh" }}
      menuHeaderRender={() => <ButtonCreate />}
      menuItemRender={menuItemRender}
      // menuExtraRender={() => <ButtonCreate />}
      selectedKeys={[active]}
      rightContentRender={() => {
        return (
          <Space align="center">
            <span>{data?.user?.name}</span>
            <Dropdown overlay={menu(router)}>
              <Avatar style={{ cursor: "pointer" }} src={data?.user?.image} />
            </Dropdown>
          </Space>
        );
      }}
      title={title}
      theme="dark"
      // disableContentMargin
      fixSiderbar
      loading={status === "loading"}
      collapsedButtonRender={false}
    >
      {children}
    </ProLayout>
  );
}

export default Layout;
