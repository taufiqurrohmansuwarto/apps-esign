import { useRouter } from "next/router";
import { useQuery } from "@tanstack/react-query";
import documents from "../../src/services/documents";

const CheckDocumentById = () => {
  // this should be document
  const router = useRouter();
  const { data, isLoading, error } = useQuery(
    ["document", router.query.id],
    () => documents.getDocumentById(router.query.id)
  );

  return <div>{JSON.stringify(error)}</div>;
};

export default CheckDocumentById;
