import {
  CheckSquareOutlined,
  ClockCircleOutlined,
  FolderOpenOutlined,
  UnorderedListOutlined,
} from "@ant-design/icons";

export default {
  routes: [
    {
      path: "/settings/personal-information",
      name: "Informasi Akun",
      icon: <UnorderedListOutlined />,
    },
    {
      path: "/settings/activity-log",
      name: "Aktivitas",
      icon: <FolderOpenOutlined />,
    },
    {
      path: "/settings/faq",
      name: "Pertanyaan",
      icon: <ClockCircleOutlined />,
    },
    {
      path: "/settings/signatures",
      name: "Stempel",
      icon: <CheckSquareOutlined />,
    },
  ],
};
