import SortBy from "../../ui/SortBy";
import TableOperations from "../../ui/TableOperations";

function TripCostsTableOperations() {
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
            value: "totalCost-desc",
            label: "Ordenar por costo total (mayor a menor)",
          },
          {
            value: "totalCost-asc",
            label: "Ordenar por costo total (menor a mayor)",
          },
        ]}
      />
    </TableOperations>
  );
}

export default TripCostsTableOperations;
