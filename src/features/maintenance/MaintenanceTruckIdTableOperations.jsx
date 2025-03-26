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
            label: "All",
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
          { value: "date-desc", label: "Sort by date (recent first)" },
          { value: "date-asc", label: "Sort by date (earlier first)" },
          {
            value: "cost-asc",
            label: "Sort by cost (low first)",
          },
          {
            value: "cost-desc",
            label: "Sort by cost (high first)",
          },
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

export default MaintenanceTruckIdTableOperations;
