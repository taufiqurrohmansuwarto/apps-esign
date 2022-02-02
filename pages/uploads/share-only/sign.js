import { useRouter } from "next/router";
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

export default AddRecipientsRequestFromOthers;
