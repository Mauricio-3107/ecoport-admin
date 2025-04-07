import SortBy from "../../ui/SortBy";
import TableOperations from "../../ui/TableOperations";

function TripCostsTableOperations() {
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
          { value: "totalCost-desc", label: "Sort by total cost (high first)" },
          { value: "totalCost-asc", label: "Sort by total cost (low first)" },
        ]}
      />
    </TableOperations>
  );
}

export default TripCostsTableOperations;
