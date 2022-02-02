import {
  BookOutlined,
  CheckSquareOutlined,
  ClockCircleOutlined,
  CloseSquareOutlined,
  FieldTimeOutlined,
  FolderOpenOutlined,
  UnorderedListOutlined,
} from "@ant-design/icons";

export default {
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
    ,
  ],
};
