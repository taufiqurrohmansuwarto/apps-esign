import dynamic from "next/dynamic";
import Link from "next/link";
import { useRouter } from "next/router";
import mainRoutes from "../routes/main-routes";

const ProLayout = dynamic(() => import("@ant-design/pro-layout"), {
  ssr: false,
});

const menuItemRender = (options, element) => {
  return (
    <Link href={`${options.path}`}>
      <a>{element}</a>
    </Link>
  );
};

function NestedLayout({ children, active = "/documents/list/all" }) {
  const router = useRouter();
  const currentRoutes = {
    routes: mainRoutes?.routes.find((r) => r?.path === active)?.routes,
  };

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
