import Filter from "../../ui/Filter";
import SortBy from "../../ui/SortBy";
import TableOperations from "../../ui/TableOperations";

function MaintenanceTruckIdTableOperations() {
  return (
    <TableOperations>
      <Filter
        filterField="maintenanceKind"
        options={[
          {
            label: "Todos",
            value: "all",
          },
          {
            label: "Reparación",
            value: "repair",
          },
          {
            label: "Compra repuesto",
            value: "spare",
          },
        ]}
      />

      <SortBy
        options={[
          {
            value: "date-desc",
            label: "Ordenar por fecha (más reciente primero)",
          },
          {
            value: "date-asc",
            label: "Ordenar por fecha (más antigua primero)",
          },
          {
            value: "cost-asc",
            label: "Ordenar por costo (menor a mayor)",
          },
          {
            value: "cost-desc",
            label: "Ordenar por costo (mayor a menor)",
          },
          {
            value: "name-asc",
            label: "Ordenar por nombre (A-Z)",
          },
          {
            value: "name-desc",
            label: "Ordenar por nombre (Z-A)",
          },
        ]}
      />
    </TableOperations>
  );
}

export default MaintenanceTruckIdTableOperations;
