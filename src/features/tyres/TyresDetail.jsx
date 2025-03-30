import Row from "../../ui/Row";
import Heading from "../../ui/Heading";

function TyresDetail({ licensePlate }) {
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">Neúmaticos: {licensePlate}</Heading>
        {/* <MaintenanceTruckIdTableOperations /> */}
      </Row>
      <Row>{/* <MaintenanceTable /> */}</Row>
    </>
  );
}

export default TyresDetail;
