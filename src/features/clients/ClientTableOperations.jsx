import Filter from "../../ui/Filter";
import SortBy from "../../ui/SortBy";
import TableOperations from "../../ui/TableOperations";

function ClientTableOperations() {
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

export default ClientTableOperations;
