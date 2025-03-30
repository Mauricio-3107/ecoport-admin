import SortBy from "../../ui/SortBy";
import TableOperations from "../../ui/TableOperations";

function OilTableOperations() {
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
          { value: "oilDate-desc", label: "Sort by date (recent first)" },
          { value: "oilDate-asc", label: "Sort by date (earlier first)" },
          { value: "lastKm-desc", label: "Sort by Km (high first)" },
          { value: "lastKm-asc", label: "Sort by Km (low first)" },
        ]}
      />
    </TableOperations>
  );
}

export default OilTableOperations;
