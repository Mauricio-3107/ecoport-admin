import useMediaQuery from "../../hooks/useMediaQuery";
import Menus from "../../ui/Menus";
import Pagination from "../../ui/Pagination";
import Spinner from "../../ui/Spinner";
import Table from "../../ui/Table";
import TilesGrid from "../../ui/TilesGrid";
import TripRow from "./TripRow";
import TripTile from "./TripTile";
import { useTrips } from "./useTrips";

function TripTable({ truckDriverAssignments, clientsObject }) {
  const isMobile = useMediaQuery("(max-width: 768px)");

  const { isLoading: isLoadingTrips, trips, count } = useTrips();

  if (isLoadingTrips) return <Spinner />;

  if (isMobile)
    return (
      <Menus>
        <TilesGrid>
          {trips.map((trip) => (
            <TripTile key={trip.id} trip={trip} />
          ))}
        </TilesGrid>
        <Pagination count={count} />
      </Menus>
    );

  return (
    <Menus>
      <Table columns="0.1fr 1fr 1fr 1fr 1fr 1.3fr 1fr 0.5fr">
        <Table.Header role="header">
          <div></div>
          <div>Tipo</div>
          <div>Origen</div>
          <div>Destino</div>
          <div>Fecha</div>
          <div>Unidad</div>
          <div>Cliente</div>
          <div></div>
        </Table.Header>

        <Table.Body
          data={trips}
          render={(trip) => (
            <TripRow
              key={trip.id}
              trip={trip}
              truckDriverAssignments={truckDriverAssignments}
              clientsObject={clientsObject}
            />
          )}
        />

        <Table.Footer>
          <Pagination count={count} />
        </Table.Footer>
      </Table>
    </Menus>
  );
}

export default TripTable;
