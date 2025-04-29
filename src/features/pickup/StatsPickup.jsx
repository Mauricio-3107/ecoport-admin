import styled from "styled-components";
import {
  HiOutlineBookmarkSquare,
  HiOutlineClock,
  HiOutlineGlobeAlt,
  HiOutlineMapPin,
} from "react-icons/hi2";
import { formatMileage, formatRuntime } from "../../utils/helpers";
import StatPickup from "./StatPickup";

const StatsBox = styled.div`
  grid-column: 3 / span 2;
  display: grid;
  gap: 1.6rem;
  align-items: center;

  @media screen and (max-width: 768px) {
    grid-column: 1 / -1; /* <— This forces full width on mobile */
    padding: 1.6rem;
  }
`;

function StatsPickup({ licensePlate, kilometers, runtime }) {
  return (
    <StatsBox>
      <StatPickup
        title="Kilómetros"
        color="indigo"
        icon={<HiOutlineGlobeAlt />}
        value={formatMileage(kilometers)}
      />
      <StatPickup
        title="Tiempo manejado"
        color="yellow"
        icon={<HiOutlineClock />}
        value={formatRuntime(runtime)}
      />
      <StatPickup
        title="Ubicación actual"
        color="green"
        icon={<HiOutlineMapPin />}
        value={"Cochabamba"}
      />
      <StatPickup
        title="Placa"
        color="blue"
        icon={<HiOutlineBookmarkSquare />}
        value={licensePlate}
      />
    </StatsBox>
  );
}

export default StatsPickup;
