import { useQuery } from "@tanstack/react-query";
import moment from "moment";
import {
  Avatar,
  Button,
  Descriptions,
  Divider,
  Result,
  Skeleton,
  Space,
  Table,
} from "antd";
import { useRouter } from "next/router";
import documents from "../../src/services/documents";
import FileSaver from "file-saver";
import { DownloadOutlined } from "@ant-design/icons";

const TampilRecipients = ({ data }) => {
  const columns = [
    {
      title: "Nama",
      key: "nama",
      render: (_, row) => {
        return (
          <Space>
            <Avatar src={row.file_foto} />
            {row?.nama}
          </Space>
        );
      },
    },
    { title: "NIP", dataIndex: "nip_baru" },
    { title: "Role", dataIndex: "role" },
    {
      title: "Apakah disetujui",
      key: "is_approve",
      render: (_, row) => <div>{row?.is_approve ? "Setuju" : "Tidak"}</div>,
    },
    { title: "Tanggal disetujui/tidak", dataIndex: "approval_date" },
  ];
  return (
    <>
      {/* <div>{JSON.stringify(data)}</div> */}
      <Table
        title={() => "Daftar Penerima"}
        style={{ marginTop: "2rem" }}
        dataSource={data}
        pagination={false}
        size="small"
        columns={columns}
      />
    </>
  );
};

const TampilDataEsign = ({ data }) => {
  const downloadFile = () => {
    FileSaver.saveAs(data?.url, "file.pdf");
  };

  const owner = (recipients) => {
    if (recipients?.length === 0) {
      return "";
    } else {
      return recipients?.find((recipient) => recipient?.is_owner === true);
    }
  };

  const listRecipients = (recipients) => {
    if (recipients?.length === 0) {
      return "";
    } else {
      return recipients?.filter((recipient) => !recipient?.is_owner);
    }
  };

  return (
    <>
      <div>
        <Descriptions
          bordered
          title="Data Aplikasi E-Sign"
          size="small"
          layout="vertical"
        >
          <Descriptions.Item label="Nama File">
            {data?.title}.pdf
          </Descriptions.Item>
          <Descriptions.Item label="Workflow">
            {data?.workflow}
          </Descriptions.Item>
          <Descriptions.Item label="Diunggah tanggal">
            {moment(data?.created_at).format("DD MMMM YYYY HH:mm")}
          </Descriptions.Item>
          <Descriptions.Item label="Pemilik File">
            <Space>
              <Avatar src={owner(data?.recipients)?.file_foto} />
              {owner(data?.recipients)?.nama} &bull;
              {owner(data?.recipients)?.nip_baru}
            </Space>
          </Descriptions.Item>
        </Descriptions>

        <TampilRecipients data={listRecipients(data?.recipients)} />

        <Button
          style={{ marginTop: "1rem" }}
          onClick={downloadFile}
          icon={<DownloadOutlined />}
          type="primary"
        >
          Unduh File
        </Button>
      </div>
    </>
  );
};

const TampilDataBSRE = ({ data }) => {
  return (
    <>
      <Descriptions bordered title={`Data BSRE`} size="small" layout="vertical">
        <Descriptions.Item label="Nama Dokumen">
          {data?.nama_dokumen}
        </Descriptions.Item>
        <Descriptions.Item label="Jumlah Signature">
          {data?.jumlah_signature}
        </Descriptions.Item>
        <Descriptions.Item label="Kesimpulan">
          {data?.summary === null
            ? "Tidak ada tanda tangan"
            : "Ada tanda tangan"}
        </Descriptions.Item>
        <Descriptions.Item label="Detail">
          {JSON.stringify(data?.details)}
        </Descriptions.Item>
      </Descriptions>
    </>
  );
};

const DataFound = ({ data }) => {
  return (
    <div>
      <TampilDataBSRE data={data?.data_bsre} />
      <Divider />
      <TampilDataEsign data={data?.data_esign} />
    </div>
  );
};

const DataNotFound = ({ data }) => {
  return (
    <Result
      status={403}
      title={403}
      subTitle="Maaf dokumen yang anda cari tidak ditemukan"
    >
      Data E-SIGN
    </Result>
  );
};

const CheckDocumentById = () => {
  // this should be document
  const router = useRouter();

  const { data, isLoading, error } = useQuery(
    ["document-check", router.query.id],
    () => documents.checkDocumentById(router.query.id),
    {
      refetchOnWindowFocus: false,
    }
  );

  return (
    <div>
      <Skeleton loading={isLoading}>
        {data?.data ? (
          <DataFound data={data?.data} />
        ) : (
          <DataNotFound data={data?.data} />
        )}
      </Skeleton>
    </div>
  );
};

export default CheckDocumentById;
