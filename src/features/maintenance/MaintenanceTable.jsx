import Spinner from "../../ui/Spinner";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import { useSearchParams } from "react-router-dom";
import Empty from "../../ui/Empty";
import { useMaintenance } from "./useMaintenance";
import MaintenanceRow from "./MaintenanceRow";

function MaintenanceTable() {
  const [searchParams] = useSearchParams();
  const { isLoading, maintenanceTruck } = useMaintenance();
  if (isLoading) return <Spinner />;

  if (!maintenanceTruck.length)
    return <Empty resourceName="Truck maintenance" />;

  // Sorting
  const sortRaw = searchParams.get("sortBy") || "licensePlate-asc";
  const [field, direction] = sortRaw.split("-");

  const modifier = direction === "asc" ? 1 : -1;
  // const sortedTrucks = trucks.sort((a, b) => (a[field] - b[field]) * modifier);
  const sortedMaintenance = maintenanceTruck.sort((a, b) => {
    if (typeof a[field] === "string" && typeof b[field] === "string") {
      // Use localeCompare for strings
      return a[field].localeCompare(b[field]) * modifier;
    } else {
      // Use subtraction for numbers
      return (a[field] - b[field]) * modifier;
    }
  });

  return (
    <Menus>
      <Table columns="1fr 1.5fr 1fr 1fr 1.5fr 1fr">
        <Table.Header role="row">
          <div>Tipo de mantenimiento</div>
          <div>Nombre</div>
          <div>Costo (Bs)</div>
          <div>Fecha</div>
          <div>Notas</div>
          <div></div>
        </Table.Header>
        <Table.Body
          data={sortedMaintenance}
          render={(maintenance) => (
            <MaintenanceRow key={maintenance.id} maintenance={maintenance} />
          )}
        />
      </Table>
    </Menus>
  );
}

export default MaintenanceTable;
