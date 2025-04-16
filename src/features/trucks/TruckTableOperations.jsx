import SortBy from "../../ui/SortBy";
import TableOperations from "../../ui/TableOperations";

function TruckTableOperations() {
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
            value: "year-asc",
            label: "Ordenar por año (más antiguo primero)",
          },
          {
            value: "year-desc",
            label: "Ordenar por año (más reciente primero)",
          },
          {
            value: "hp-asc",
            label: "Ordenar por potencia (menor a mayor)",
          },
          {
            value: "hp-desc",
            label: "Ordenar por potencia (mayor a menor)",
          },
        ]}
      />
    </TableOperations>
  );
}

export default TruckTableOperations;
