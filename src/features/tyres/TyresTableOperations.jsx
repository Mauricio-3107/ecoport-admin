import SortBy from "../../ui/SortBy";
import TableOperations from "../../ui/TableOperations";

function TyresTableOperations() {
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
        ]}
      />
    </TableOperations>
  );
}

export default TyresTableOperations;
