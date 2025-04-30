import MaintenanceLayout from "../features/maintenance/MaintenanceLayout";
import MaintenanceTableOperations from "../features/maintenance/MaintenanceTableOperations";
import { useTrucks } from "../features/trucks/useTrucks";
import Heading from "../ui/Heading";
import Row from "../ui/Row";
import Spinner from "../ui/Spinner";

function Maintenance() {
  const { isLoading, trucks } = useTrucks();
  if (isLoading) return <Spinner />;
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">Mantenimiento</Heading>
        <MaintenanceTableOperations />
      </Row>
      <MaintenanceLayout trucks={trucks} />
    </>
  );
}

export default Maintenance;
