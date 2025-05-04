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
  margin-bottom: 1.2rem;
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
  const status = "";
  const navigate = useNavigate();

  return (
    <Card>
      <Img src={image} alt={truckId} />
      <Heading as="h3">{licensePlate}</Heading>

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
        <span>Eficiencia:</span>
        {fuelEfficiency || "—"}
      </Field>

      <Field>
        <span>Status:</span>
        {status || "—"}
      </Field>

      <Menus.Menu>
        <Menus.Toggle id={truckId} />
        <Menus.List id={truckId}>
          <Menus.Button
            icon={<HiOutlinePresentationChartLine />}
            onClick={() => navigate(`/fuel/${truckId}`)}
          >
            See history consumption
          </Menus.Button>
        </Menus.List>
      </Menus.Menu>
    </Card>
  );
}

export default FuelTile;
