import { useTrucks } from "./useTrucks";
import TruckRow from "./TruckRow";
import Spinner from "../../ui/Spinner";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import { useSearchParams } from "react-router-dom";
import Empty from "../../ui/Empty";

function TruckTable() {
  const { isLoading, trucks } = useTrucks();
  const [searchParams] = useSearchParams();

  if (isLoading) return <Spinner />;
  if (!trucks.length) return <Empty resourceName="trucks" />;

  // Sorting
  const sortRaw = searchParams.get("sortBy") || "licensePlate-asc";
  const [field, direction] = sortRaw.split("-");

  const modifier = direction === "asc" ? 1 : -1;
  // const sortedTrucks = trucks.sort((a, b) => (a[field] - b[field]) * modifier);
  const sortedTrucks = trucks.sort((a, b) => {
    if (typeof a[field] === "string" && typeof b[field] === "string") {
      // Use localeCompare for strings
      return a[field].localeCompare(b[field]) * modifier;
    } else {
      // Use subtraction for numbers
      return (a[field] - b[field]) * modifier;
    }
  });

  return (
    <Menus>
      <Table columns="0.6fr 1.8fr 2.2fr 1fr 1fr 1fr 1fr 1fr 1fr">
        <Table.Header role="row">
          <div></div>
          <div>Placa</div>
          <div>Tarjeta Operaciones</div>
          <div>Seguro</div>
          <div>Capacidad</div>
          <div>Tracción</div>
          <div>Año</div>
          <div>HP</div>
          <div></div>
        </Table.Header>
        <Table.Body
          data={sortedTrucks}
          render={(truck) => <TruckRow key={truck.id} truck={truck} />}
        />
      </Table>
    </Menus>
  );
}

export default TruckTable;
