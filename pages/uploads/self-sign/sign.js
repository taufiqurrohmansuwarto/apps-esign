import { useRouter } from "next/router";
import MailSelfSign from "../../../src/components/MainSelfSign";
import SelfSignUploadLayout from "../../../src/components/SelfSignUploadLayout";

const Sign = () => {
  const router = useRouter();
  const { documentId } = router?.query;

  return (
    <SelfSignUploadLayout step={1}>
      <MailSelfSign id={documentId} />
    </SelfSignUploadLayout>
  );
};

Sign.auth = {
  roles: ["USER"],
};

export default Sign;
