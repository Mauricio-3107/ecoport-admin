import { useSearchParams } from "react-router-dom";
import Empty from "../../ui/Empty";
import Menus from "../../ui/Menus";
import Spinner from "../../ui/Spinner";
import Table from "../../ui/Table";
import FuelRow from "./FuelRow";
import { useFuel } from "./useFuel";
import useMediaQuery from "../../hooks/useMediaQuery";
import TilesGrid from "../../ui/TilesGrid";
import FuelTile from "./FuelTile";

function FuelTable() {
  const isMobile = useMediaQuery("(max-width: 768px)");

  const { isLoading, fuelConsumptionTrucks } = useFuel();
  const [searchParams] = useSearchParams();

  if (isLoading) return <Spinner />;
  if (!fuelConsumptionTrucks.length)
    return <Empty resourceName="consumo de combustible" />;

  // Sorting
  const sortRaw = searchParams.get("sortBy") || "licensePlate-asc";
  const [field, direction] = sortRaw.split("-");

  const modifier = direction === "asc" ? 1 : -1;
  // const sortedTrucks = trucks.sort((a, b) => (a[field] - b[field]) * modifier);
  const sortedTrucks = fuelConsumptionTrucks.sort((a, b) => {
    if (
      typeof a.trucks[field] === "string" &&
      typeof b.trucks[field] === "string"
    ) {
      // Use localeCompare for strings
      return a.trucks[field].localeCompare(b.trucks[field]) * modifier;
    } else {
      // Use subtraction for numbers
      return (a[field] - b[field]) * modifier;
    }
  });

  if (isMobile) {
    return (
      <Menus>
        <TilesGrid>
          {sortedTrucks.map((fuelTruck) => (
            <FuelTile key={fuelTruck.id} fuelTruck={fuelTruck} />
          ))}
        </TilesGrid>
      </Menus>
    );
  }

  return (
    <Menus>
      <Table columns="0.6fr 1.3fr 1.3fr 1.3fr 1fr 1fr 1fr 1fr 0.5fr">
        <Table.Header role="row">
          <div></div>
          <div>Placa</div>
          <div>Fecha</div>
          <div>Lugar</div>
          <div>Km</div>
          <div>Litros</div>
          <div>Eficiencia (Km/L)</div>
          <div>Status</div>
          <div></div>
        </Table.Header>
        <Table.Body
          data={sortedTrucks}
          render={(fuelTruck) => (
            <FuelRow key={fuelTruck.id} fuelTruck={fuelTruck} />
          )}
        />
      </Table>
    </Menus>
  );
}

export default FuelTable;
