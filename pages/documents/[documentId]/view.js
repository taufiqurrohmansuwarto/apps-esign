import { toString } from "lodash";
import { getSession } from "next-auth/react";
import DetailDocumentLayout from "../../../src/components/DetailDocumentLayout";
import DocumentFinishOrWaiting from "../../../src/components/DocumentFinishOrWaiting";
import MainRequestFromOthersSign from "../../../src/components/MainRequestFromOthersSign";
import MailSelfSign from "../../../src/components/MainSelfSign";

// {role : reviewer, document_status : on going, workflow : 'selfSign}
const splitId = (id) => {
  const [_, currentId] = id?.split("|");
  return currentId;
};

const MainDocument = ({ document }) => {
  const { workflow, status, type, id, user, recipients } = document;

  let signOrNot = "initial";
  const currentUserId = splitId(user?.id);
  const owner = recipients?.find((recipient) => recipient?.is_owner);
  const currentUser = recipients.find(
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
    currentUser?.signatory_status === "";

  const requestFromOthersSignNotFinished =
    workflow === "requestFromOthers" &&
    currentUser?.role === "signer" &&
    currentUser?.signatory_status === "";

  if (workflowSelfSignNotFinisihed) {
    signOrNot = "initial";
  } else if (workflowRequestFromOthersNotFinisihed) {
    signOrNot = "initial";
  }

  // return <DocumentFinishOrWaiting id={id} />;

  // return <div>{JSON.stringify(recipients)}</div>;

  if (workflowSelfSignNotFinisihed) {
    return <MailSelfSign id={id} />;
  } else if (workflowRequestFromOthersNotFinisihed) {
    return <MainRequestFromOthersSign id={id} />;
  } else {
    return <DocumentFinishOrWaiting id={id} />;
  }
};

const View = ({ data, id, user }) => {
  const document = {
    workflow: data?.workflow,
    status: data?.status?.documentStatus,
    type: data?.type,
    id,
    user: user?.user,
    recipients: data?.recipients,
  };

  return (
    <DetailDocumentLayout
      status={data?.document_status}
      info={{ status: data?.status?.documentStatus, workflow: data?.workflow }}
      document={{ title: `${data?.title}.pdf` }}
      documentStatus={data?.status}
    >
      <MainDocument document={document} />
    </DetailDocumentLayout>
  );
};

export const getServerSideProps = async (ctx) => {
  const { documentId } = ctx.params;
  const session = await getSession(ctx);
  const url = process.env.RESOURCE_PROTECTED_URL;

  const data = await fetch(`${url}/documents/${documentId}/details`, {
    headers: {
      Authorization: `Bearer ${session?.accessToken}`,
    },
  });
  const result = await data?.json();

  return {
    props: {
      data: result,
      id: documentId,
      user: session,
    },
  };
};

View.auth = {
  roles: ["USER"],
};

export default View;
