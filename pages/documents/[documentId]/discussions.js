import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import DetailDocumentLayout from "../../../src/components/DetailDocumentLayout";
import Discussions from "../../../src/components/Discussions";
import documents from "../../../src/services/documents";

const Discussion = () => {
  const router = useRouter();

  const {
    query: { documentId },
  } = router;

  const { data, isLoading } = useQuery(
    ["layout-view", documentId],
    () => documents.detailDocument(documentId),
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
      <Discussions documentId={documentId} />
    </DetailDocumentLayout>
  );
};

Discussion.auth = {
  roles: ["USER"],
};

export default Discussion;
