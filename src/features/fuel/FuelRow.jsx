import styled from "styled-components";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import { useNavigate } from "react-router-dom";
import { HiOutlinePresentationChartLine } from "react-icons/hi2";
import { formatDateBolivia, formatKm } from "../../utils/helpers";

const Img = styled.img`
  display: block;
  width: 6.4rem;
  aspect-ratio: 3 / 2.5;
  object-fit: cover;
  object-position: center;
  transform: scale(1.5) translateX(-7px);
`;

const LicensePlate = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono";
`;

const Efficency = styled.div`
  font-family: "Sono";
  font-weight: 600;
`;

const Status = styled.div`
  font-family: "Sono";
  font-weight: 500;
  color: ${({ status }) =>
    status === "green" ? "var(--color-green-700)" : "var(--color-red-700)"};
`;

function FuelRow({ fuelTruck }) {
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
    <Table.Row role="row">
      <Img src={image} alt={truckId} />
      <LicensePlate>{licensePlate}</LicensePlate>
      <div>{fuelDate ? formatDateBolivia(fuelDate) : <span>&mdash;</span>}</div>
      <div>{location ? location : <span>&mdash;</span>}</div>
      <div>{formatKm(odometerKm)}</div>
      <div>{litersFueled}</div>
      <Efficency>
        {fuelEfficiency ? fuelEfficiency : <span>&mdash;</span>}
      </Efficency>
      <Status>{status ? status : <span>&mdash;</span>}</Status>
      <div>
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
      </div>
    </Table.Row>
  );
}

export default FuelRow;
