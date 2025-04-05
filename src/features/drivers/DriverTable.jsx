import { useSearchParams } from "react-router-dom";
import Menus from "../../ui/Menus";
import Spinner from "../../ui/Spinner";
import Table from "../../ui/Table";
import { useTruckDriverAssignments } from "../truckDriverAssignments/useTruckDriverAssignments";
import { useTrucks } from "../trucks/useTrucks";
import DriverRow from "./DriverRow";
import { useDrivers } from "./useDrivers";

function enrichDriversWithAssignments(drivers, truckDriverAssignments) {
  // 1. Create a hash map of assignments
  const assignmentsMap = truckDriverAssignments.reduce((map, assignment) => {
    map[assignment.drivers.id] = {
      licensePlate: assignment.trucks.licensePlate,
      assignmentId: assignment.id,
    };
    return map;
  }, {});
  // 2. Enrich driver with assignment data
  const enrichedDrivers = drivers.map((driver) => {
    const assignment = assignmentsMap[driver.id];
    return {
      ...driver,
      licensePlate: assignment ? assignment.licensePlate : null,
      assignmentId: assignment ? assignment.assignmentId : null,
    };
  });

  return enrichedDrivers;
}

function DriverTable() {
  const { isLoading: isLoadingDrivers, drivers } = useDrivers();
  const { isLoading: isLoadingTda, truckDriverAssignments } =
    useTruckDriverAssignments();
  const { isLoading: isLoadingTrucks, trucks } = useTrucks();
  const [searchParams] = useSearchParams();

  const isLoading = isLoadingDrivers || isLoadingTda || isLoadingTrucks;

  if (isLoading) return <Spinner />;

  // Drivers
  const enrichedDrivers = enrichDriversWithAssignments(
    drivers,
    truckDriverAssignments
  );

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

  // Filtering
  const filterValue = searchParams.get("licensePlate") || "all";
  let filterDrivers;
  if (filterValue === "all") filterDrivers = enrichedDrivers;
  if (filterValue === "with-licensePlate")
    filterDrivers = enrichedDrivers.filter((driver) => driver.licensePlate);
  if (filterValue === "no-licensePlate")
    filterDrivers = enrichedDrivers.filter((driver) => !driver.licensePlate);

  // Sorting
  const sortRaw = searchParams.get("sortBy") || "licensePlate-asc";
  const [field, direction] = sortRaw.split("-");
  const modifier = direction === "asc" ? 1 : -1;
  const sortedDrivers = filterDrivers.sort((a, b) => {
    const aVal = a[field] ?? "";
    const bVal = b[field] ?? "";
    return aVal.localeCompare(bVal) * modifier;
  });

  return (
    <Menus>
      <Table columns="0.6fr 2.2fr 1fr 1fr 1fr 1fr 1fr">
        <Table.Header role="row">
          <div></div>
          <div>Nombre</div>
          <div>Licencia</div>
          <div>Celular</div>
          <div>Placa</div>
          <div>Sueldo (Bs)</div>
          <div></div>
        </Table.Header>
        <Table.Body
          data={sortedDrivers}
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
