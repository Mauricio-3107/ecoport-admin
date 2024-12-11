import SortBy from "../../ui/SortBy";
import TableOperations from "../../ui/TableOperations";

function TruckTableOperations() {
  return (
    <TableOperations>
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
            value: "year-asc",
            label: "Sort by year (low first)",
          },
          {
            value: "year-desc",
            label: "Sort by year (high first)",
          },
          {
            value: "hp-asc",
            label: "Sort by HP (low first)",
          },
          {
            value: "hp-desc",
            label: "Sort by HP (high first)",
          },
        ]}
      />
    </TableOperations>
  );
}

export default TruckTableOperations;
