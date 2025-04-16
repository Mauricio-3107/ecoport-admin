import SortBy from "../../ui/SortBy";
import TableOperations from "../../ui/TableOperations";

function MaintenanceTableOperations() {
  return (
    <TableOperations>
      <SortBy
        options={[
          {
            value: "licensePlate-asc",
            label: "Ordenar por placa (menor a mayor)",
          },
          {
            value: "licensePlate-desc",
            label: "Ordenar por placa (mayor a menor)",
          },
        ]}
      />
    </TableOperations>
  );
}

export default MaintenanceTableOperations;
