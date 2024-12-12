import AddTrip from "../features/trips/AddTrip";
import TripTable from "../features/trips/TripTable";
import { useTruckDriverAssignments } from "../features/truckDriverAssignments/useTruckDriverAssignments";
import Heading from "../ui/Heading";
import Row from "../ui/Row";
import Spinner from "../ui/Spinner";

function Trips() {
  const { isLoading: isLoadingTda, truckDriverAssignments } =
    useTruckDriverAssignments();
  if (isLoadingTda) return <Spinner />;
  console.log(truckDriverAssignments);
  const tdaForm = truckDriverAssignments.map((assignment) => ({
    id: assignment.id,
    licensePlate: assignment.trucks.licensePlate,
    fullName: assignment.drivers.fullName,
  }));

  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">All Trips</Heading>
        <p>TEST</p>
      </Row>
      <Row>
        <TripTable />
        <Row type="horizontal-no-space">
          <AddTrip tripType="export" truckDriverAssignments={tdaForm} />
          <AddTrip tripType="import" truckDriverAssignments={tdaForm} />
        </Row>
      </Row>
    </>
  );
}

export default Trips;
