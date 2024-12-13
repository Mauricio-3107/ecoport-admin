import styled from "styled-components";
import Table from "../../ui/Table";

const Stacked = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.2rem;

  & span:first-child {
    font-weight: 500;
  }

  & span:last-child {
    color: var(--color-grey-500);
    font-size: 1.2rem;
  }
`;

function TripRow({ trip }) {
  const {
    id: tripId,
    tripType,
    origin,
    destination,
    startDate,
    clients: { name },
    truckDriverAssignments: {
      trucks: { licensePlate },
      drivers: { fullName },
    },
  } = trip;
  return (
    <Table.Row role="row">
      <div></div>
      <div>{tripType}</div>
      <div>{origin}</div>
      <div>{destination}</div>
      <div>{startDate.split("T")[0]}</div>
      <Stacked>
        <span>{licensePlate}</span>
        <span>{fullName.split(" ").slice(0, 2).join(" ")}</span>
      </Stacked>
      <div>{name}</div>
      <div></div>
    </Table.Row>
  );
}

export default TripRow;
