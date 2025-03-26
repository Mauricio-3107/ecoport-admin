import { useSearchParams } from "react-router-dom";
import Menus from "../../ui/Menus";
import Spinner from "../../ui/Spinner";
import Table from "../../ui/Table";
import OilRow from "./OilRow";
import { useOil } from "./useOil";
import Empty from "../../ui/Empty";

function OilTable() {
  const { isLoading, oil } = useOil();
  const [searchParams] = useSearchParams();

  if (isLoading) return <Spinner />;
  if (!oil.length) return <Empty resourceName="Oil" />;

  // Sorting
  const sortRaw = searchParams.get("sortBy") || "licensePlate-asc";
  const [field, direction] = sortRaw.split("-");

  const modifier = direction === "asc" ? 1 : -1;
  // const sortedTrucks = trucks.sort((a, b) => (a[field] - b[field]) * modifier);
  const sortedTrucks = oil.sort((a, b) => {
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
      if (
        typeof a[field] === "string" &&
        typeof b[field] === "string"
      ) {
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
      <Table columns="0.6fr 1.3fr 1.3fr 1fr 1fr 1fr 1fr 0.5fr">
        <Table.Header role="row">
          <div></div>
          <div>Placa</div>
          <div>Nombre</div>
          <div>Fecha</div>
          <div>Km cambio</div>
          <div>Km a cambiar</div>
          <div>Km</div>
          <div></div>
        </Table.Header>
        <Table.Body
          data={sortedTrucks}
          render={(oilTruck) => (
            <OilRow key={oilTruck.id} oilTruck={oilTruck} />
          )}
        />
      </Table>
    </Menus>
  );
}

export default OilTable;
