import styled from "styled-components";
import { formatDateBolivia } from "../../utils/helpers";

const Card = styled.div`
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);
  padding: 1.6rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const Img = styled.img`
  width: 100%;
  aspect-ratio: 16/9;
  object-fit: cover;
  border-radius: var(--border-radius-sm);
  margin-bottom: 1.2rem;
`;

const Heading = styled.h3`
  font-size: 2rem;
  font-weight: 600;
  color: var(--color-grey-700);
`;

const Field = styled.div`
  font-size: 1.4rem;
  color: var(--color-grey-700);

  & span {
    font-weight: 600;
    text-transform: uppercase;
    color: var(--color-grey-500);
    margin-right: 0.4rem;
  }
`;

function OilTile({ oilTruck }) {
  const {
    name,
    lastKm,
    nextKm,
    odometerKm,
    oilDate,
    trucks: { licensePlate, image },
  } = oilTruck;

  return (
    <Card>
      <Img src={image} alt={licensePlate} />
      <Heading>{licensePlate}</Heading>

      <Field>
        <span>Nombre:</span>
        {name || <span>&mdash;</span>}
      </Field>

      <Field>
        <span>Fecha:</span>
        {oilDate ? formatDateBolivia(oilDate) : <span>&mdash;</span>}
      </Field>

      <Field>
        <span>Último KM:</span>
        {lastKm ?? <span>&mdash;</span>}
      </Field>

      <Field>
        <span>Próximo KM:</span>
        {nextKm ?? <span>&mdash;</span>}
      </Field>

      <Field>
        <span>KM Actual:</span>
        {odometerKm ?? <span>&mdash;</span>}
      </Field>
    </Card>
  );
}

export default OilTile;
