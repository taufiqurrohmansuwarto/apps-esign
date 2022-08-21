import { FormOutlined } from "@ant-design/icons";
import { useQuery } from "@tanstack/react-query";
import { Button, Modal, Skeleton, Space } from "antd";
import Link from "next/link";
import { useState } from "react";
import documents from "../services/documents";

const buttons = [
  {
    name: "Self Sign",
    path: "/uploads/self-sign/upload",
    disabled: false,
    idLang: "Tanda Tangan Mandiri",
  },
  {
    name: "Sign And Request",
    path: "/uploads/sign-and-share/upload",
    disabled: true,
    idLang: "Tanda Tangan dan Request Dari Orang Lain",
  },
  {
    name: "Request From Others",
    path: "/uploads/share-only/upload",
    disabled: false,
    idLang: "Request Dari Orang Lain",
  },
];

function ButtonCreate() {
  const [visible, setVisible] = useState(false);
  const { data: status, isLoading } = useQuery(
    ["status"],
    () => documents.checkStatus(),
    {
      refetchOnWindowFocus: false,
    }
  );

  const showModal = () => {
    setVisible(true);
  };

  const getListButtons = () => {
    if (status?.message === "User tidak terdaftar dalam bsre") {
      return buttons.map((button) => ({
        ...button,
        disabled:
          button?.name === "Self Sign" || button?.name === "Sign And Request"
            ? true
            : false,
      }));
    } else {
      return buttons;
    }
  };

  return (
    <>
      <Modal
        centered
        title="Pilih Alur Kerja Dokumen"
        footer={null}
        onCancel={() => setVisible(false)}
        visible={visible}
        width={700}
      >
        <Skeleton loading={isLoading}>
          <Space>
            {getListButtons().map((b) => (
              <Link key={b?.path} href={`${b?.path}`}>
                <Button disabled={b?.disabled}>{b?.idLang}</Button>
              </Link>
            ))}
          </Space>
        </Skeleton>
      </Modal>
      <Button
        icon={<FormOutlined />}
        type="primary"
        onClick={showModal}
      ></Button>
    </>
  );
}

export default ButtonCreate;
