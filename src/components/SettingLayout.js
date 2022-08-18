import { LogoutOutlined } from "@ant-design/icons";
import { Avatar, Dropdown, Menu, Space } from "antd";
import { signOut, useSession } from "next-auth/react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { useRouter } from "next/router";
import mainRoutes from "../routes/main-routes";
import settingsRoutes from "../routes/settings-routes";

const ProLayout = dynamic(() => import("@ant-design/pro-layout"), {
  ssr: false,
});

const PageContainer = dynamic(
  () => import("@ant-design/pro-layout").then((a) => a?.PageContainer),
  { ssr: false }
);

const handleSignout = () => {
  signOut();
};

const menu = (
  <Menu>
    <Menu.Item key="logut" onClick={handleSignout} icon={<LogoutOutlined />}>
      Keluar
    </Menu.Item>
  </Menu>
);

// create menu dashboard, documents, contacts

const menuHeaderRender = (logoDom, titleDom, props) => {
  return (
    <Link href="/">
      <a>
        {/* {logoDom} */}
        {!props?.collapsed && titleDom}
      </a>
    </Link>
  );
};

const menuItemRender = (options, element) => {
  return (
    <Link href={`${options.path}`}>
      <a>{element}</a>
    </Link>
  );
};

function SettingLayout({ children, title = "E-SIGN" }) {
  const { data, status } = useSession();
  const router = useRouter();

  return (
    <ProLayout
      route={mainRoutes}
      collapsed
      style={{ minHeight: "100vh" }}
      menuItemRender={menuItemRender}
      rightContentRender={() => {
        return (
          <Space align="center">
            <span>{data?.user?.name}</span>
            <Dropdown overlay={menu}>
              <Avatar style={{ cursor: "pointer" }} src={data?.user?.image} />
            </Dropdown>
          </Space>
        );
      }}
      title={title}
      theme="light"
      disableContentMargin
      fixSiderbar
      loading={status === "loading"}
      collapsedButtonRender={false}
    >
      <ProLayout
        navTheme="light"
        title="Documents"
        menuHeaderRender={false}
        collapsedButtonRender={false}
        collapsed={false}
        route={settingsRoutes}
        menuItemRender={menuItemRender}
        selectedKeys={[router?.pathname]}
      >
        {children}
      </ProLayout>
    </ProLayout>
  );
}

export default SettingLayout;
