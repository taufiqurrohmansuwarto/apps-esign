import DetailDocument from "../src/components/DetailDocument";
import Discussions from "../src/components/Discussions";
import ListDocuments from "../src/components/ListDocument";
import Recipients from "../src/components/Recipients";

const kantor = "lz9wgPq953e6gJycJQWpz";
const rumah = "nXm18a9CICHzN0WrzqdIz";

const Documents = () => {
  return (
    <>
      <ListDocuments />
      <Recipients documentId={rumah} />
      <Discussions documentId={rumah} />
      <DetailDocument documentId={rumah} />
    </>
  );
};

export default Documents;
