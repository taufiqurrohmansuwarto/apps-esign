import ListDocuments from "../../../src/components/ListDocument";
import NestedLayout from "../../../src/components/NestedLayout";

const List = () => {
  return (
    <NestedLayout>
      <ListDocuments />
    </NestedLayout>
  );
};

List.auth = {
  roles: ["USER"],
};

export default List;
