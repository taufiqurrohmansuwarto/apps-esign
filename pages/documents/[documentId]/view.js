import { useQuery } from "@tanstack/react-query";
import { toString } from "lodash";
import { useSession } from "next-auth/react";
import DetailDocumentLayout from "../../../src/components/DetailDocumentLayout";
import DocumentFinishOrWaiting from "../../../src/components/DocumentFinishOrWaiting";
import MainRequestFromOthersSign from "../../../src/components/MainRequestFromOthersSign";
import MailSelfSign from "../../../src/components/MainSelfSign";
import documents from "../../../src/services/documents";

// {role : reviewer, document_status : on going, workflow : 'selfSign}
const splitId = (id) => {
  const [_, currentId] = id?.split("|");
  return currentId;
};

const MainDocument = ({ data }) => {
  const document = {
    workflow: data?.workflow,
    status: data?.status?.documentStatus,
    type: data?.type,
    id: data?.id,
    user: data?.user,
    recipients: data?.recipients,
  };

  const { workflow, status, type, id, user, recipients } = document;

  let signOrNot = "initial";
  const currentUserId = splitId(user?.id);
  const owner = data?.recipients?.find((recipient) => recipient?.is_owner);
  const currentUser = data?.recipients?.find(
    (recipient) => toString(recipient?.employee_id) === toString(currentUserId)
  );

  // fucking not finished
  const workflowSelfSignNotFinisihed =
    workflow === "selfSign" &&
    toString(owner?.employee_id) === toString(currentUserId) &&
    owner?.status === "draft";

  const workflowRequestFromOthersNotFinisihed =
    workflow === "requestFromOthers" &&
    toString(owner?.employee_id) === toString(currentUserId) &&
    owner?.status === "draft";

  const requestFromOthersReviewerNotFinished =
    workflow === "requestFromOthers" &&
    currentUser?.role === "reviewer" &&
    currentUser?.signatory_status === "in progress";

  const requestFromOthersSignNotFinished =
    workflow === "requestFromOthers" &&
    currentUser?.role === "signer" &&
    currentUser?.signatory_status === "in progress";

  if (workflowSelfSignNotFinisihed) {
    signOrNot = "initial";
  } else if (workflowRequestFromOthersNotFinisihed) {
    signOrNot = "initial";
  }

  if (workflowSelfSignNotFinisihed) {
    return <MailSelfSign id={id} />;
  } else if (workflowRequestFromOthersNotFinisihed) {
    return <MainRequestFromOthersSign id={id} />;
  } else if (requestFromOthersReviewerNotFinished) {
    return (
      <DocumentFinishOrWaiting
        role={currentUser?.role}
        status={currentUser?.signatory_status}
        workflow="requestFromOthers"
        id={id}
      />
    );
  } else {
    return (
      <>
        <DocumentFinishOrWaiting id={id} />
      </>
    );
  }
};

const View = ({ id }) => {
  const { data: userData } = useSession();
  const { data, isLoading } = useQuery(
    ["layout-view", id],
    () => documents.detailDocument(id),
    {}
  );

  return (
    <DetailDocumentLayout
      loading={isLoading}
      status={data?.document_status}
      info={{ status: data?.status?.documentStatus, workflow: data?.workflow }}
      document={{ title: `${data?.title}.pdf` }}
      documentStatus={data?.status}
    >
      {data && <MainDocument data={{ ...data, ...userData }} />}
    </DetailDocumentLayout>
  );
};

export const getServerSideProps = async (ctx) => {
  const { documentId } = ctx.params;

  return {
    props: {
      id: documentId,
    },
  };
};

View.auth = {
  roles: ["USER"],
};

export default View;
