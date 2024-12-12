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
            label: "Todos",
            value: "all",
          },
          {
            label: "Con Placa",
            value: "with-licensePlate",
          },
          {
            label: "Sin Placa",
            value: "no-licensePlate",
          },
        ]}
      />
      <SortBy
        options={[
          {
            value: "licensePlate-asc",
            label: "Sort by plate (low first)",
          },
          {
            value: "licensePlate-desc",
            label: "Sort by plate (high first)",
          },
          {
            value: "fullName-asc",
            label: "Sort by name (A - Z)",
          },
          {
            value: "fullName-desc",
            label: "Sort by name (Z - A)",
          },
        ]}
      />
    </TableOperations>
  );
}

export default DriverTableOperations;
