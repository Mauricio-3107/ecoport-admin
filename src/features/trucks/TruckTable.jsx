import { useTrucks } from "./useTrucks";
import TruckRow from "./TruckRow";
import Spinner from "../../ui/Spinner";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import { useSearchParams } from "react-router-dom";
import Empty from "../../ui/Empty";
import useMediaQuery from "../../hooks/useMediaQuery";
import TruckTile from "./TruckTile";
import TilesGrid from "../../ui/TilesGrid";

function TruckTable() {
  const isMobile = useMediaQuery("(max-width: 768px)");
  const { isLoading, trucks } = useTrucks();
  const [searchParams] = useSearchParams();

  if (isLoading) return <Spinner />;
  if (!trucks.length) return <Empty resourceName="camión" />;

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

  if (isMobile)
    return (
      // Menus is there if I add the modal buttons
      <Menus>
        <TilesGrid>
          {sortedTrucks.map((t) => (
            <TruckTile key={t.id} truck={t} />
          ))}
        </TilesGrid>
      </Menus>
    );

  return (
    <Menus>
      <Table columns="0.6fr 1.3fr 1.3fr 1.3fr 1fr 1fr 1fr 1fr 0.5fr">
        <Table.Header role="row">
          <div></div>
          <div>Placa</div>
          <div>Tarjeta de Operaciones</div>
          <div>Seguro</div>
          <div>Tara (kg)</div>
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
