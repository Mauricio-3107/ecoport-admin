import { useSearchParams } from "react-router-dom";
import Menus from "../../ui/Menus";
import Spinner from "../../ui/Spinner";
import Table from "../../ui/Table";
import { useTruckDriverAssignments } from "../truckDriverAssignments/useTruckDriverAssignments";
import { useTrucks } from "../trucks/useTrucks";
import DriverRow from "./DriverRow";
import { useDrivers } from "./useDrivers";

function DriverTable() {
  const { isLoading: isLoadingDrivers, drivers } = useDrivers();
  const { isLoading: isLoadingTda, truckDriverAssignments } =
    useTruckDriverAssignments();
  const { isLoading: isLoadingTrucks, trucks } = useTrucks();
  const [searchParams] = useSearchParams();

  const isLoading = isLoadingDrivers || isLoadingTda || isLoadingTrucks;

  if (isLoading) return <Spinner />;

  // Available trucks
  const allTrucks = trucks.map((truck) => ({
    id: truck.id,
    licensePlate: truck.licensePlate,
  }));

  const assignedTruckIds = new Set(
    truckDriverAssignments.map((assignment) => assignment.trucks.id)
  );

  const availableTrucks = allTrucks.filter(
    (truck) => !assignedTruckIds.has(truck.id)
  );

  // Sorting
  const sortRaw = searchParams.get("sortBy") || "fullName-asc";
  const [field, direction] = sortRaw.split("-");
  const modifier = direction === "asc" ? 1 : -1;
  const sortedDrivers = drivers.sort(
    (a, b) => a[field].localeCompare(b[field]) * modifier
  );

  return (
    <Menus>
      <Table columns="0.6fr 1.8fr 2.2fr 1fr 1fr 1fr">
        <Table.Header role="row">
          <div></div>
          <div>Nombre</div>
          <div>Licencia</div>
          <div>Celular</div>
          <div>Placa</div>
          <div></div>
        </Table.Header>
        <Table.Body
          data={drivers}
          render={(driver) => (
            <DriverRow
              driver={driver}
              key={driver.id}
              truckDriverAssignments={truckDriverAssignments}
              availableTrucks={availableTrucks}
            />
          )}
        />
      </Table>
    </Menus>
  );
}

export default DriverTable;
