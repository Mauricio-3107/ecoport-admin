import { useSearchParams } from "react-router-dom";

import Empty from "../../ui/Empty";
import Spinner from "../../ui/Spinner";
import Menus from "../../ui/Menus";

import { useTripCosts } from "./useTripCosts";
import Table from "../../ui/Table";
import TripCostsRow from "./TripCostsRow";

function TripCostsTable() {
  const { isLoading, tripCosts } = useTripCosts();
  const [searchParams] = useSearchParams();

  if (isLoading) return <Spinner />;
  if (!tripCosts.length) return <Empty resourceName="Trip costs" />;

  // Sorting
  const sortRaw = searchParams.get("sortBy") || "licensePlate-asc";
  const [field, direction] = sortRaw.split("-");

  const modifier = direction === "asc" ? 1 : -1;
  // const sortedTrucks = trucks.sort((a, b) => (a[field] - b[field]) * modifier);
  const sortedTrucks = tripCosts.sort((a, b) => {
    if (field === "licensePlate") {
      if (
        typeof a.trucks[field] === "string" &&
        typeof b.trucks[field] === "string"
      ) {
        // Use localeCompare for strings
        return a.trucks[field].localeCompare(b.trucks[field]) * modifier;
      } else {
        // Use subtraction for numbers
        return (a[field] - b[field]) * modifier;
      }
    } else {
      if (typeof a[field] === "string" && typeof b[field] === "string") {
        // Use localeCompare for strings
        return a[field].localeCompare(b[field]) * modifier;
      } else {
        // Use subtraction for numbers
        return (a[field] - b[field]) * modifier;
      }
    }
  });

  return (
    <Menus>
      <Table columns="0.6fr 1.3fr 1fr 1fr 1fr 1fr 0.5fr">
        <Table.Header role="row">
          <div></div>
          <div>Placa</div>
          <div>Representante</div>
          <div>Gastos</div>
          <div>Diésel</div>
          <div>Total</div>
          <div></div>
        </Table.Header>
        <Table.Body
          data={sortedTrucks}
          render={(tripCost) => (
            <TripCostsRow key={tripCost.id} tripCost={tripCost} />
          )}
        />
      </Table>
    </Menus>
  );
}

export default TripCostsTable;
