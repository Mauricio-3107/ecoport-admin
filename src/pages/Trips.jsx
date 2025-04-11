import { useClients } from "../features/clients/useClients";
import AddTrip from "../features/trips/AddTrip";
import CreateTripOperations from "../features/trips/CreateTripOperations";
import TripTable from "../features/trips/TripTable";
import { useTruckDriverAssignments } from "../features/truckDriverAssignments/useTruckDriverAssignments";
import Heading from "../ui/Heading";
import Row from "../ui/Row";
import Spinner from "../ui/Spinner";

function Trips() {
  const { isLoading: isLoadingTda, truckDriverAssignments } =
    useTruckDriverAssignments();
  const { isLoading: isLoadingClients, clients } = useClients();

  if (isLoadingTda || isLoadingClients) return <Spinner />;

  const clientsObject = clients
    .map((client) => ({
      id: client.id,
      name: client.name,
      type: client.type,
      hidden: client.hidden,
    }))
    .sort((a, b) => {
      // Show non-hidden clients first, hidden ones (edge cases) last
      return a.hidden === b.hidden ? 0 : a.hidden ? 1 : -1;
    });

  const tdaForm = truckDriverAssignments.map((assignment) => ({
    id: assignment.id,
    licensePlate: assignment.trucks.licensePlate,
    fullName: assignment.drivers.fullName,
  }));

  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">All Trips</Heading>
        <CreateTripOperations />
      </Row>
      <Row>
        <TripTable
          truckDriverAssignments={tdaForm}
          clientsObject={clientsObject}
        />
        <Row type="horizontal-no-space">
          <AddTrip
            tripType="export"
            truckDriverAssignments={tdaForm}
            clientsObject={clientsObject}
          />
          <AddTrip
            tripType="import"
            truckDriverAssignments={tdaForm}
            clientsObject={clientsObject}
          />
        </Row>
      </Row>
    </>
  );
}

export default Trips;
