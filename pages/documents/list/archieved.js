import ListDocuments from "../../../src/components/ListDocument";
import NestedLayout from "../../../src/components/NestedLayout";

const Archieved = () => {
  return (
    <NestedLayout>
      <ListDocuments type="archieved" />
    </NestedLayout>
  );
};

export default Archieved;
