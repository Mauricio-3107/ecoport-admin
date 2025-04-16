import SortBy from "../../ui/SortBy";
import TableOperations from "../../ui/TableOperations";

function OilTableOperations() {
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
          {
            value: "oilDate-desc",
            label: "Ordenar por fecha (más reciente primero)",
          },
          {
            value: "oilDate-asc",
            label: "Ordenar por fecha (más antigua primero)",
          },
          { value: "lastKm-desc", label: "Ordenar por Km (mayor a menor)" },
          { value: "lastKm-asc", label: "Ordenar por Km (menor a mayor)" },
        ]}
      />
    </TableOperations>
  );
}

export default OilTableOperations;
