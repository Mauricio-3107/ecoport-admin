import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import MaintenanceTable from "./MaintenanceTable";
import { useLicensePlate } from "./useLicensePlate";
import Spinner from "../../ui/Spinner";

function MaintenanceDetail() {
  const { isLoading, data } = useLicensePlate();
  if (isLoading) return <Spinner />;
  const { licensePlate } = data;
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">Mantenimiento: {licensePlate}</Heading>
        {/* <TruckTableOperations /> */}
      </Row>
      <Row>
        <MaintenanceTable />
      </Row>
    </>
  );
}

export default MaintenanceDetail;
