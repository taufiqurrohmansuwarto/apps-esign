import {
  BookOutlined,
  CheckSquareOutlined,
  ClockCircleOutlined,
  CloseSquareOutlined,
  DashboardOutlined,
  FieldTimeOutlined,
  FileOutlined,
  FolderOpenOutlined,
  UnorderedListOutlined,
} from "@ant-design/icons";

export default {
  routes: [
    {
      path: "/dashboard",
      name: " Dashboard",
      icon: <DashboardOutlined />,
    },
    {
      path: "/documents",
      name: " Documents",
      hideChildrenInMenu: true,
      icon: <FileOutlined />,
      routes: [
        {
          path: "/documents/list/all",
          name: "All Documents",
          icon: <UnorderedListOutlined />,
        },
        {
          path: "/documents/list/draft",
          name: "Draft",
          icon: <FolderOpenOutlined />,
        },
        {
          path: "/documents/list/pending",
          name: "Pending",
          icon: <ClockCircleOutlined />,
        },
        {
          path: "/documents/list/done",
          name: "Done",
          icon: <CheckSquareOutlined />,
        },
        {
          path: "/documents/list/expired",
          name: "Expired",
          icon: <FieldTimeOutlined />,
        },
        {
          path: "/documents/list/archieved",
          name: "Archieved",
          icon: <BookOutlined />,
        },
        {
          path: "/documents/list/rejected",
          name: "Rejected",
          icon: <CloseSquareOutlined />,
        },
      ],
    },
    {
      // path: "/contacts",
      // name: " Contacts",
      // icon: <ContactsOutlined />,
    },
  ],
};
