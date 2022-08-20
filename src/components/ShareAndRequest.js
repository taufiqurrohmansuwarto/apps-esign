import {
  DeleteOutlined,
  PlusCircleFilled,
  PlusOutlined,
} from "@ant-design/icons";
import { useDebounce } from "@umijs/hooks";
import {
  Alert,
  Avatar,
  Button,
  Drawer,
  List,
  message,
  Radio,
  Select,
  Space,
  Spin,
} from "antd";
import isEmpty from "lodash/isEmpty";
import { useRouter } from "next/router";
import { useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useDispatch, useSelector } from "react-redux";
import {
  addRecipients,
  addSigntoSigner,
  changeRole,
  removeRecipients,
} from "../../features/sign/request-from-others.slice";
import documents from "../services/documents";

const ListRecipients = ({
  recipients,
  handleRemoveRecipients,
  handleChangeRole,
  handleAddSign,
}) => {
  return (
    <List
      itemLayout="horizontal"
      dataSource={recipients}
      renderItem={(item) => (
        <List.Item
          actions={[
            <Button
              type="danger"
              onClick={() => handleRemoveRecipients(item.id)}
              icon={<DeleteOutlined />}
              size="small"
            />,
            <Radio.Group
              size="small"
              defaultValue={item?.role}
              onChange={() => handleChangeRole(item.id)}
            >
              <Radio.Button value={"reviewer"}>Reviewer</Radio.Button>
              <Radio.Button
                value={"signer"}
                disabled={item?.status === "NOT_REGISTERED"}
              >
                Signer
              </Radio.Button>
            </Radio.Group>,
            <div>
              {item?.role === "signer" && (
                <Button
                  onClick={() =>
                    handleAddSign({
                      ...item,
                      frame: {
                        height: 175,
                        width: 350,
                        translate: [0, 0, 0],
                      },
                      userId: item.id,
                    })
                  }
                  size="small"
                  type="primary"
                >
                  SIGN
                </Button>
              )}
            </div>,
          ]}
        >
          <List.Item.Meta
            avatar={<Avatar src={item?.fileDiri?.foto} />}
            title={`${item?.nama} (${item?.role})`}
            description={item?.jabatan}
          />
        </List.Item>
      )}
    />
  );
};

const ShareAndRequest = () => {
  const data = useSelector((state) => state.requestFromOthers);
  const dispatch = useDispatch();
  const [searching, setSearching] = useState("");
  const debouncFilter = useDebounce(searching, 800);
  const [user, setUser] = useState(undefined);

  const [showDrawer, setShowDrawer] = useState(false);

  const router = useRouter();

  // untuk menghandle membuat recipients
  const recipientsMutation = useMutation(
    (data) => documents.createRecipients(data),
    {
      onSettled: () => {},
      onError: (error) => {},
      onSuccess: () => {},
    }
  );

  const handleRemoveRecipients = (id) => {
    dispatch(removeRecipients(id));
  };

  const handleChangeRole = (id) => {
    dispatch(changeRole(id));
  };

  const handleAddSign = (data) => {
    dispatch(addSigntoSigner(data));
  };

  const {
    data: employeeData,
    isLoading: loadingEmployee,
    isFetching,
  } = useQuery(
    ["employees", debouncFilter],
    () => documents.findEmployee(debouncFilter),
    { enabled: Boolean(debouncFilter), refetchOnWindowFocus: false }
  );

  // this fucking multiple request like shit
  const handleChange = async (id) => {
    try {
      setUser(employeeData);
    } catch (error) {
      message.error("Hmmmmm... theres something error", error);
    }
  };

  const handleSubmit = async () => {
    // first thing you must get the document id and looping throung the users / the recipients
    const { dataSign, dataUser, documentData } = data;

    const { id: documentId } = documentData;

    const users = dataUser.map((user) => ({
      id: user?.id,
      userId: user?.pegawai_id,
      nama: user?.nama,
      role: user?.role,
    }));

    const signs = dataSign.map((sign) => {
      const { frame, page, id, userId } = sign;
      const [x, y] = frame.translate;
      const { height, width } = frame;

      const xPos = x < 0 ? 0 : x;
      const yPos = y < 0 ? 0 : y;

      return {
        xPos,
        yPos,
        height,
        width,
        page,
        id,
        employee_id: userId,
        userId,
      };
    });

    const currentDataPost = users.map((user, index) => {
      const properties = signs.filter((sign) => sign.userId === user.id);

      // fucking serialize this data
      const sign_coordinate = properties?.map((prop) => ({
        xPos: prop?.xPos,
        yPos: prop?.yPos,
        width: prop?.width,
        height: prop?.height,
        page: prop?.page,
      }));

      const total_sign_pages = properties?.length;
      const sign_pages = sign_coordinate?.map((s) => s?.page);

      // kalau user itu merupakan reviewer dinullkan
      return {
        sequence: index + 1,
        role: user?.role,
        signatory_status: "in progress",
        status: "on progress",
        employee_id: user?.userId,
        sign_pages: user?.role === "reviewer" ? null : sign_pages,
        sign_coordinate: user?.role == "reviewer" ? null : sign_coordinate,
        total_sign_pages: user?.role === "reviewer" ? null : total_sign_pages,
      };
    });

    // cek dulu
    const signerWithZeroProperty = currentDataPost.filter(
      (user) => user?.role === "signer" && user?.properties?.length === 0
    );

    if (signerWithZeroProperty?.length > 0 || dataUser?.length === 0) {
      message.error(
        "Ada signer yang memiliki properti kosong atau tidak ada yang dientri"
      );
    } else {
      const data = { documentId, data: currentDataPost };
      await recipientsMutation.mutateAsync(data);
      router.push(`/documents/${documentId}/view`);
    }
  };

  return (
    <div>
      <Button
        icon={<PlusCircleFilled />}
        onClick={() => setShowDrawer(true)}
        type="primary"
      >
        Peserta
      </Button>
      <Drawer
        title="Peserta pada dokumen"
        width={750}
        visible={showDrawer}
        onClose={() => setShowDrawer(false)}
        extra={
          <Space>
            <Button onClick={() => setShowDrawer(false)}>Batal</Button>
            <Button type="primary" onClick={handleSubmit}>
              Submit
            </Button>
          </Space>
        }
      >
        <Alert
          style={{ marginBottom: 20 }}
          type="warning"
          showIcon
          description="Dokumen akan diproses secara urut berdasarkan daftar pegawai yang diinputkan. Pastikan pegawai yang melakukan TTE adalah pegawai yang sudah terdaftar di sistem BSrE"
        />
        <Select
          style={{ width: "80%" }}
          placeholder="Masukkan NIP"
          defaultActiveFirstOption={false}
          showSearch
          allowClear
          notFoundContent={isFetching ? <Spin size="small" /> : null}
          loading={loadingEmployee}
          showArrow={false}
          filterOption={false}
          onSearch={(e) => setSearching(e)}
          onChange={handleChange}
        >
          {!isEmpty(employeeData) && (
            <Select.Option key={employeeData?.nip} value={employeeData?.nip}>
              <Space>
                {employeeData.nama} - {employeeData.nip}
              </Space>
            </Select.Option>
          )}
        </Select>
        <Button
          icon={<PlusCircleFilled />}
          type="primary"
          onClick={() => dispatch(addRecipients(user))}
          disabled={loadingEmployee || !employeeData}
          style={{ marginLeft: "1rem" }}
        >
          Peserta
        </Button>
        {data?.dataUser.length ? (
          <div>
            <ListRecipients
              recipients={data?.dataUser}
              handleRemoveRecipients={handleRemoveRecipients}
              handleChangeRole={handleChangeRole}
              handleAddSign={handleAddSign}
            />
          </div>
        ) : null}
      </Drawer>
    </div>
  );
};

export default ShareAndRequest;
