import Row from "../ui/Row";
import Heading from "../ui/Heading";

import TripCostsTable from "../features/tripCosts/TripCostsTable";
import TripCostsTableOperations from "../features/tripCosts/TripCostsTableOperations";

function TripCosts() {
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">Trip costs (Bs)</Heading>
        <TripCostsTableOperations />
      </Row>
      <Row>
        <TripCostsTable />
      </Row>
    </>
  );
}

export default TripCosts;
