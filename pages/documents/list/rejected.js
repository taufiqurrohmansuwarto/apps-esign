import ListDocuments from "../../../src/components/ListDocument";
import NestedLayout from "../../../src/components/NestedLayout";

const Rejected = () => {
  return (
    <NestedLayout>
      <ListDocuments type="rejected" />
    </NestedLayout>
  );
};

export default Rejected;
