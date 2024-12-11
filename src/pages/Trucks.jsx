import TruckTable from "../features/trucks/truckTable";
import Heading from "../ui/Heading";
import Row from "../ui/Row";
import AddTruck from "../features/trucks/AddTruck";
import TruckTableOperations from "../features/truck/TruckTableOperations";

function Trucks() {
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">All Trucks</Heading>
        <TruckTableOperations />
      </Row>
      <Row>
        <TruckTable />
        <AddTruck />
      </Row>
    </>
  );
}

export default Trucks;
