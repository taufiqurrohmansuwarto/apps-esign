import { useRouter } from "next/router";
import Layout from "../../../src/components/Layout";
import MainRequestFromOthersSign from "../../../src/components/MainRequestFromOthersSign";
import RequestFromOthersUploadLayout from "../../../src/components/RequestFromOthersLayout";

const AddRecipientsRequestFromOthers = () => {
  const router = useRouter();
  const { documentId } = router?.query;

  return (
    <RequestFromOthersUploadLayout step={1}>
      <MainRequestFromOthersSign id={documentId} />
    </RequestFromOthersUploadLayout>
  );
};

AddRecipientsRequestFromOthers.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

AddRecipientsRequestFromOthers.auth = {
  roles: ["USER"],
};

export default AddRecipientsRequestFromOthers;
