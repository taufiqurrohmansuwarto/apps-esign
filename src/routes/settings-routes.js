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
      name: "Personal Information",
      icon: <UnorderedListOutlined />,
    },
    {
      path: "/settings/activity-log",
      name: "Activities",
      icon: <FolderOpenOutlined />,
    },
    {
      path: "/settings/faq",
      name: "FAQ",
      icon: <ClockCircleOutlined />,
    },
    {
      path: "/settings/signatures",
      name: "Signature",
      icon: <CheckSquareOutlined />,
    },
  ],
};
