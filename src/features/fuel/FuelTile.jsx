import styled from "styled-components";
import { formatDateBolivia, formatKm } from "../../utils/helpers";
import { HiOutlinePresentationChartLine } from "react-icons/hi2";
import { useNavigate } from "react-router-dom";
import Menus from "../../ui/Menus";
import Heading from "../../ui/Heading";

const Card = styled.div`
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);
  padding: 1.6rem;
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
`;

const Img = styled.img`
  width: 100%;
  height: auto;
  aspect-ratio: 16 / 12;
  object-fit: cover;
  border-radius: var(--border-radius-sm);
  margin-bottom: 1.6rem;
  box-shadow: var(--shadow-sm);
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

const Row = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const StatusBadge = styled.div`
  display: inline-block;
  padding: 0.4rem 1.2rem;
  border-radius: 100px;
  font-size: 1.2rem;
  font-weight: 600;
  color: ${({ $status }) =>
    $status === "green" ? "var(--color-green-700)" : "var(--color-red-700)"};
  background-color: ${({ $status }) =>
    $status === "green" ? "var(--color-green-100)" : "var(--color-red-100)"};
  width: fit-content;
`;

function FuelTile({ fuelTruck }) {
  const {
    trucks: { licensePlate, image, id: truckId },
    litersFueled,
    odometerKm,
    fuelEfficiency,
    fuelDate,
    location,
    id,
  } = fuelTruck;
  const parsedEfficiency = parseFloat(fuelEfficiency);
  const status = fuelEfficiency && parsedEfficiency >= 2.5 ? "green" : "red";
  const navigate = useNavigate();

  return (
    <Card>
      <Img src={image} alt={truckId} />
      <Row>
        <Heading as="h3">{licensePlate}</Heading>
        <Menus.Menu>
          <Menus.Toggle id={truckId} />
          <Menus.List id={truckId}>
            <Menus.Button
              icon={<HiOutlinePresentationChartLine />}
              onClick={() => navigate(`/fuel/${truckId}`)}
            >
              Ver historial de consumo
            </Menus.Button>
          </Menus.List>
        </Menus.Menu>
      </Row>

      <Field>
        <span>Fecha:</span>
        {fuelDate ? formatDateBolivia(fuelDate) : "—"}
      </Field>

      <Field>
        <span>Lugar:</span>
        {location || "—"}
      </Field>

      <Field>
        <span>Kilometraje actual:</span>
        {formatKm(odometerKm)}
      </Field>

      <Field>
        <span>Litros:</span>
        {litersFueled}
      </Field>

      <Field>
        <span>Eficiencia (Km/L):</span>
        <strong>
          {fuelEfficiency
            ? parseFloat(fuelEfficiency).toFixed(1).replace(".", ",")
            : "—"}
        </strong>
      </Field>

      <Field>
        <span>Status:</span>
        {fuelEfficiency ? (
          <StatusBadge $status={status}>
            {status === "green" ? "Bueno" : "Malo"}
          </StatusBadge>
        ) : (
          "—"
        )}
      </Field>
    </Card>
  );
}

export default FuelTile;
