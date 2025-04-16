import Filter from "../../ui/Filter";
import SortBy from "../../ui/SortBy";
import TableOperations from "../../ui/TableOperations";

function CreateTripOperations() {
  return (
    <TableOperations>
      <Filter
        filterField="type"
        options={[
          {
            value: "all",
            label: "Todos",
          },
          {
            value: "export",
            label: "Export",
          },
          {
            value: "import",
            label: "Import",
          },
        ]}
      />
      <SortBy
        options={[
          {
            value: "startDate-desc",
            label: "Ordenar por fecha (más reciente primero)",
          },
          {
            value: "startDate-asc",
            label: "Ordenar por fecha (más antigua primero)",
          },
        ]}
      />
    </TableOperations>
  );
}

export default CreateTripOperations;
