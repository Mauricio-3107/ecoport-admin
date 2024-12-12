import Table from "../../ui/Table";

function TripRow({ trip }) {
  const {
    id: tripId,
    tripType,
    origin,
    destination,
    startDate,
    assignmentId,
    client,
    cargoDetailsId,
  } = trip;
  return (
    <Table.Row role="row">
      <div></div>
      <div>{tripType}</div>
      <div>{origin}</div>
      <div>{destination}</div>
      <div>{startDate}</div>
      <div>{assignmentId}</div>
      <div>{client}</div>
      <div></div>
    </Table.Row>
  );
}

export default TripRow;
