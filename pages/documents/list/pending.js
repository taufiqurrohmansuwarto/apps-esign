import ListDocuments from "../../../src/components/ListDocument";
import NestedLayout from "../../../src/components/NestedLayout";

const Pending = () => {
  return (
    <NestedLayout>
      <ListDocuments type="waiting" />
    </NestedLayout>
  );
};

export default Pending;
