import Filter from "../../ui/Filter";
import SortBy from "../../ui/SortBy";
import TableOperations from "../../ui/TableOperations";

function DriverTableOperations() {
  return (
    <TableOperations>
      <Filter
        filterField="licensePlate"
        options={[
          {
            label: "Con Placa",
            value: "with-licensePlate",
          },
          {
            label: "Sin Placa",
            value: "no-licensePlate",
          },
          {
            label: "Todos",
            value: "all",
          },
        ]}
      />
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
            value: "fullName-asc",
            label: "Ordenar por nombre (A - Z)",
          },
          {
            value: "fullName-desc",
            label: "Ordenar por nombre (Z - A)",
          },
        ]}
      />
    </TableOperations>
  );
}

export default DriverTableOperations;
