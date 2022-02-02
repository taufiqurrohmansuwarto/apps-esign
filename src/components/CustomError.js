import { Button, Result } from "antd";
import { useRouter } from "next/router";
import React from "react";

function CustomError({ statusCode }) {
  let message;
  if (statusCode === 404) {
    message = "Halaman yang anda cari tidak ditemukan";
  } else if (statusCode === 403) {
    message =
      "Anda tidak punya kewenangan untuk melakukan akses di halaman ini";
  }

  const router = useRouter();

  const goHome = () => {
    router.push("/");
  };

  return (
    <Result
      status={statusCode}
      title={statusCode}
      subTitle={message}
      extra={
        <Button onClick={goHome} type="primary">
          Kembali Ke beranda
        </Button>
      }
    />
  );
}

export default CustomError;
