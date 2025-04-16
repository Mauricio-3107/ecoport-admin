import Spinner from "../../ui/Spinner";
import Heading from "../../ui/Heading";
import Row from "../../ui/Row";
import FuelTruckIdFilter from "./FuelTruckIdFilter";
import FuelTruckIdLayout from "./FuelTruckIdLayout";
import Empty from "../../ui/Empty"; // Existing Empty component

import { useFuelTruckId } from "./useFuelTruckId";

function FuelTruckId() {
  const { isLoading, fuelTruckId, error } = useFuelTruckId();

  if (isLoading) return <Spinner />;
  if (error) return <Empty resourceName="camión" />; // Case 3: Truck ID does not exist

  // Case 2: Truck exists but has no fuel data
  if (fuelTruckId.length === 0) return <Empty resourceName="registro de combustible" />;
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">Historial de Consumo de Combustible</Heading>
        <FuelTruckIdFilter />
      </Row>

      <FuelTruckIdLayout fuelTruckId={fuelTruckId} />
    </>
  );
}

export default FuelTruckId;
