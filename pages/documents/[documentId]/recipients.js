import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import DetailDocumentLayout from "../../../src/components/DetailDocumentLayout";
import Recipients from "../../../src/components/Recipients";

import documents from "../../../src/services/documents";

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
      <Recipients documentId={documentId} />
    </DetailDocumentLayout>
  );
};

Information.auth = {
  roles: ["USER"],
};

export default Information;
