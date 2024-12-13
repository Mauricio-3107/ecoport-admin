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
          { value: "startDate-desc", label: "Sort by date (recent first)" },
          { value: "startDate-asc", label: "Sort by date (earlier first)" },
        ]}
      />
    </TableOperations>
  );
}

export default CreateTripOperations;
