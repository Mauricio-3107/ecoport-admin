import Menus from "../../ui/Menus";
import Pagination from "../../ui/Pagination";
import Spinner from "../../ui/Spinner";
import Table from "../../ui/Table";
import TripRow from "./TripRow";
import { useTrips } from "./useTrips";

function TripTable({ truckDriverAssignments, clientsObject }) {
  const { isLoading: isLoadingTrips, trips, count } = useTrips();

  if (isLoadingTrips) return <Spinner />;
  
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
