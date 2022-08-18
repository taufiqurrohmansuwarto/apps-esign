import { LogoutOutlined } from "@ant-design/icons";
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

function NestedLayout({ children, title = "E-SIGN" }) {
  const router = useRouter();
  const currentRoutes = {
    routes: mainRoutes?.routes.find((r) => r?.path === "/documents/list/all")
      ?.routes,
  };

  // const active = `/${router?.asPath?.split("/")?.[1]}`;

  return (
    <ProLayout
      navTheme="light"
      title="Documents"
      collapsedButtonRender={false}
      collapsed={false}
      route={currentRoutes}
      menuItemRender={menuItemRender}
      menuDataRender={false}
      menuExtraRender={false}
      menuHeaderRender={false}
      headerRender={false}
      selectedKeys={[router?.pathname]}
    >
      {children}
    </ProLayout>
  );
}

export default NestedLayout;
