import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import DetailDocument from "../../../src/components/DetailDocument";

import documents from "../../../src/services/documents";
import DetailDocumentLayout from "../../../src/components/DetailDocumentLayout";

const Information = () => {
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
      <DetailDocument documentId={documentId} />
    </DetailDocumentLayout>
  );
};

Information.auth = {
  roles: ["USER"],
};

export default Information;
