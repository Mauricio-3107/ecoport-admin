import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import MaintenanceTable from "./MaintenanceTable";
import MaintenanceTruckIdTableOperations from "./MaintenanceTruckIdTableOperations";

function MaintenanceDetail({ licensePlate }) {
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">Mantenimiento: {licensePlate}</Heading>
        <MaintenanceTruckIdTableOperations />
      </Row>
      <Row>
        <MaintenanceTable />
      </Row>
    </>
  );
}

export default MaintenanceDetail;
