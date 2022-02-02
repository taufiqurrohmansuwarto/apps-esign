import UploadDocument from "../../../src/components/UploadDocument";
import SelfSignUploadLayout from "../../../src/components/SelfSignUploadLayout";

function UploadSelfSign() {
  return (
    <SelfSignUploadLayout>
      <UploadDocument type="selfSign" />
    </SelfSignUploadLayout>
  );
}

UploadSelfSign.auth = {
  roles: ["USER"],
};

export default UploadSelfSign;
