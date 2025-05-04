import styled from "styled-components";

const Card = styled.div`
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);
  padding: 1.6rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
  transition: all 0.2s;

  &:hover {
    transform: translateY(-2px);
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

const LicensePlate = styled.h3`
  font-size: 2rem;
  margin-top: 1rem;
  color: var(--color-grey-800);
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

export default function TripCostsTile({ tripCost }) {
  const {
    agent,
    expenses,
    extraFuel,
    totalCost,
    // id: tripCostId,
    trucks: { licensePlate, image, id: truckId },
  } = tripCost;

  // const tripCostToEdit = { id: tripCostId, agent, expenses, extraFuel };

  return (
    <Card>
      <Img src={image} alt={truckId} />

      <LicensePlate>{licensePlate}</LicensePlate>
      <Field>
        <span>Total:</span> {totalCost ?? "—"}
      </Field>

      <Field>
        <span>Gastos:</span> {expenses ?? "—"}
      </Field>

      <Field>
        <span>Combustible:</span> {extraFuel ?? "—"}
      </Field>

      <Field>
        <span>Representante:</span> {agent || "—"}
      </Field>
    </Card>
  );
}
