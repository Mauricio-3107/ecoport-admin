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
            label: "All",
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
            label: "Sort by name (A-Z)",
          },
          {
            value: "name-desc",
            label: "Sort by name (Z-A)",
          },
        ]}
      />
    </TableOperations>
  );
}

export default ClientTableOperations;
