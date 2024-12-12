import Menus from "../../ui/Menus";
import Spinner from "../../ui/Spinner";
import Table from "../../ui/Table";
import TripRow from "./TripRow";
import { useTrips } from "./useTrips";

function TripTable() {
  const { isLoading: isLoadingTrips, trips } = useTrips();
 
  if (isLoadingTrips) return <Spinner />;
  return (
    <Menus>
      <Table columns="0.6fr 1.3fr 1.3fr 1.3fr 1fr 1fr 1fr 0.5fr">
        <Table.Header role="header">
          <div></div>
          <div>Trip Type</div>
          <div>Origin</div>
          <div>Destination</div>
          <div>Start Date</div>
          <div>Truck</div>
          <div>Client</div>
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
