import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import MaintenanceTable from "./MaintenanceTable";
import MaintenanceTruckIdTableOperations from "./MaintenanceTruckIdTableOperations";
import useMediaQuery from "../../hooks/useMediaQuery";

function MaintenanceDetail({ licensePlate }) {
  const isMobile = useMediaQuery("(max-width: 768px)");
  return (
    <>
      <Row type="horizontal">
        <Heading as={`${isMobile ? "h2" : "h1"}`}>
          Mantenimiento: {licensePlate}
        </Heading>
        <MaintenanceTruckIdTableOperations />
      </Row>
      <Row>
        <MaintenanceTable />
      </Row>
    </>
  );
}

export default MaintenanceDetail;
