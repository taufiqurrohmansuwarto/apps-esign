import { getSession } from "next-auth/react";
import { useRouter } from "next/router";
import DetailDocumentLayout from "../../../src/components/DetailDocumentLayout";
import Recipients from "../../../src/components/Recipients";

const Information = ({ data }) => {
  const router = useRouter();

  const {
    query: { documentId },
  } = router;

  return (
    <DetailDocumentLayout
      status={data?.document_status}
      info={{ status: data?.status?.documentStatus, workflow: data?.workflow }}
      document={{ title: `${data?.title}.pdf` }}
      documentStatus={data?.status}
    >
      <Recipients documentId={documentId} />
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
    },
  };
};

Information.auth = {
  roles: ["USER"],
};

export default Information;
