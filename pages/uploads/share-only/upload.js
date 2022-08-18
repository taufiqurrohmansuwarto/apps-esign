import Layout from "../../../src/components/Layout";
import RequestFromOthersUploadLayout from "../../../src/components/RequestFromOthersLayout";
import UploadDocument from "../../../src/components/UploadDocument";

function Upload() {
  return (
    <RequestFromOthersUploadLayout step={0}>
      <UploadDocument type="requestFromOthers" />
    </RequestFromOthersUploadLayout>
  );
}

Upload.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

Upload.auth = {
  roles: ["USER"],
};

export default Upload;
