import { PlusOutlined } from "@ant-design/icons";
import { Button, Modal, Space } from "antd";
import Link from "next/link";
import { useState } from "react";

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

  const showModal = () => {
    setVisible(true);
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
        <Space>
          {buttons?.map((b) => (
            <Link key={b?.path} href={`${b?.path}`}>
              <Button disabled={b?.disabled}>{b?.name}</Button>
            </Link>
          ))}
        </Space>
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
