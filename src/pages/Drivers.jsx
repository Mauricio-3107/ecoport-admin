import AddDriver from "../features/drivers/AddDriver";
import DriverTable from "../features/drivers/DriverTable";
import DriverTableOperations from "../features/drivers/DriverTableOperations";
import Heading from "../ui/Heading";
import Row from "../ui/Row";

function Drivers() {
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">All Drivers</Heading>
        <DriverTableOperations />
      </Row>
      <Row>
        <DriverTable />
        <AddDriver />
      </Row>
    </>
  );
}

export default Drivers;
