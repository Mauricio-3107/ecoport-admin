import OilTable from "../features/oil/OilTable";
import OilTableOperations from "../features/oil/OilTableOperations";
import Heading from "../ui/Heading";
import Row from "../ui/Row";

function Oil() {
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">Oil engine</Heading>
        <OilTableOperations />
      </Row>
      <Row>
        <OilTable />
      </Row>
    </>
  );
}

export default Oil;
