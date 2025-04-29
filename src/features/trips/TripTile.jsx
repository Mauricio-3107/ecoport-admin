import styled from "styled-components";
import { formatDateBolivia } from "../../utils/helpers";

const Card = styled.div`
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);
  padding: 1.6rem;
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Title = styled.h3`
  font-size: 1.8rem;
  margin: 0;
  text-transform: capitalize;
`;

const Field = styled.div`
  font-size: 1.4rem;
  color: var(--color-grey-700);
`;

export default function TripTile({ trip }) {
  const {
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
    <Card>
      <Header>
        <Title>{tripType}</Title>
      </Header>

      <Field>
        <strong>Origen:</strong> {origin}
      </Field>
      <Field>
        <strong>Destino:</strong> {destination}
      </Field>
      <Field>
        <strong>Fecha:</strong> {formatDateBolivia(startDate)}
      </Field>
      <Field>
        <strong>Unidad:</strong> {licensePlate} -{" "}
        {fullName.split(" ").slice(0, 2).join(" ")}
      </Field>
      <Field>
        <strong>Cliente:</strong> {name}
      </Field>
    </Card>
  );
}
