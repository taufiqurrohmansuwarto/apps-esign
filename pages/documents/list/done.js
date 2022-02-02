import ListDocuments from "../../../src/components/ListDocument";
import NestedLayout from "../../../src/components/NestedLayout";

const Done = () => {
  return (
    <NestedLayout>
      <ListDocuments type="completed" />
    </NestedLayout>
  );
};

export default Done;
