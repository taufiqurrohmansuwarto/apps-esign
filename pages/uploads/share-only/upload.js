import RequestFromOthersUploadLayout from "../../../src/components/RequestFromOthersLayout";
import UploadDocument from "../../../src/components/UploadDocument";

function Upload() {
  return (
    <RequestFromOthersUploadLayout step={0}>
      <UploadDocument type="requestFromOthers" />
    </RequestFromOthersUploadLayout>
  );
}

export default Upload;
