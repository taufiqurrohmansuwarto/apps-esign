import { PlusOutlined } from "@ant-design/icons";
import { Button, Modal, Skeleton, Space } from "antd";
import Link from "next/link";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import documents from "../services/documents";

const buttons = [
  { name: "Self Sign", path: "/uploads/self-sign/upload", disabled: false },
  {
    name: "Sign And Request",
    path: "/uploads/sign-and-share/upload",
    disabled: true,
  },
  {
    name: "Request From Others",
    path: "/uploads/share-only/upload",
    disabled: false,
  },
];

function ButtonCreate() {
  const [visible, setVisible] = useState(false);
  const { data: status, isLoading } = useQuery(["status"], () =>
    documents.checkStatus()
  );

  const showModal = () => {
    setVisible(true);
  };

  const getListButtons = () => {
    if (status?.message === "User tidak terdaftar dalam bsre") {
      return buttons.map((button) => ({
        ...button,
        disabled: button?.name === "Self Sign" ? true : false,
      }));
    } else {
      return buttons;
    }
  };

  return (
    <>
      <Modal
        centered
        title="Choose document workflow"
        footer={null}
        onCancel={() => setVisible(false)}
        visible={visible}
      >
        <Skeleton loading={isLoading}>
          <Space>
            {getListButtons().map((b) => (
              <Link key={b?.path} href={`${b?.path}`}>
                <Button disabled={b?.disabled}>{b?.name}</Button>
              </Link>
            ))}
          </Space>
        </Skeleton>
      </Modal>
      <Button
        icon={<PlusOutlined />}
        type="primary"
        onClick={showModal}
      ></Button>
    </>
  );
}

export default ButtonCreate;
