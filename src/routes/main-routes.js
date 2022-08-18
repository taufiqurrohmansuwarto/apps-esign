import {
  BookOutlined,
  CheckSquareOutlined,
  ClockCircleOutlined,
  CloseSquareOutlined,
  DashboardOutlined,
  FieldTimeOutlined,
  FileOutlined,
  FolderOpenOutlined,
  SettingOutlined,
  UnorderedListOutlined,
} from "@ant-design/icons";

export default {
  routes: [
    {
      path: "/dashboard",
      name: " Dasbor",
      icon: <DashboardOutlined />,
    },
    {
      path: "/documents/list/all",
      name: " Dokumen",
      hideChildrenInMenu: true,
      icon: <FileOutlined />,
      routes: [
        {
          path: "/documents/list/all",
          name: "Semua dokumen",
          icon: <UnorderedListOutlined />,
        },
        {
          path: "/documents/list/draft",
          name: "Draf",
          icon: <FolderOpenOutlined />,
        },
        {
          path: "/documents/list/pending",
          name: "Menunggu",
          icon: <ClockCircleOutlined />,
        },
        {
          path: "/documents/list/done",
          name: "Selesai",
          icon: <CheckSquareOutlined />,
        },
        {
          path: "/documents/list/expired",
          name: "Kadaluarsa",
          icon: <FieldTimeOutlined />,
        },
        {
          path: "/documents/list/archieved",
          name: "Arsip",
          icon: <BookOutlined />,
        },
        {
          path: "/documents/list/rejected",
          name: "Ditolak",
          icon: <CloseSquareOutlined />,
        },
      ],
    },
    {
      path: "/settings/personal-information",
      name: "Pengaturan",
      hideChildrenInMenu: true,
      icon: <SettingOutlined />,
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
    },
  ],
};
