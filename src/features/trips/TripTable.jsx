import Menus from "../../ui/Menus";
import Spinner from "../../ui/Spinner";
import Table from "../../ui/Table";
import TripRow from "./TripRow";
import { useTrips } from "./useTrips";

function TripTable() {
  const { isLoading: isLoadingTrips, trips } = useTrips();

  if (isLoadingTrips) return <Spinner />;
  console.log(trips);
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
          render={(trip) => <TripRow key={trip.id} trip={trip} />}
        />
      </Table>
    </Menus>
  );
}

export default TripTable;
