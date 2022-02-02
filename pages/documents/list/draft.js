import ListDocuments from "../../../src/components/ListDocument";
import NestedLayout from "../../../src/components/NestedLayout";

const Draft = () => {
  return (
    <NestedLayout>
      <ListDocuments type="draft" />
    </NestedLayout>
  );
};

export default Draft;
