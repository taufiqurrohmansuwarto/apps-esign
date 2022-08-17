import dynamic from "next/dynamic";

const PageContainer = dynamic(
  () => import("@ant-design/pro-layout").then((r) => r?.PageContainer),
  { ssr: false }
);

export default PageContainer;
