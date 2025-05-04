import styled from "styled-components";
import { formatDateBolivia, formatKm } from "../../utils/helpers";

const Card = styled.div`
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);
  padding: 1.6rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;

  /* ✨ NEW: subtle shadow and transition */
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
  transition: all 0.2s;

  &:hover {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  }
`;

const Img = styled.img`
  width: 100%;
  height: auto;
  aspect-ratio: 16 / 12;
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
        <span>KM Actual:</span>
        {formatKm(odometerKm)}
      </Field>

      <Field>
        <span>Último KM:</span>
        {formatKm(lastKm)}
      </Field>

      <Field>
        <span>Próximo KM:</span>
        {formatKm(nextKm)}
      </Field>
    </Card>
  );
}

export default OilTile;
