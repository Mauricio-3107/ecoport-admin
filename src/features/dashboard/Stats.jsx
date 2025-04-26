import {
  HiOutlineArrowsRightLeft,
  HiOutlineBanknotes,
  HiOutlineChartBar,
  HiOutlineGlobeAlt,
} from "react-icons/hi2";
import Stat from "./Stat";
import { formatCurrency, formatMileage, formatRate } from "../../utils/helpers";
import styled from "styled-components";
const StatsGrid = styled.div`
  display: grid;
  gap: 1.6rem;

  // Desktop: 4 columns
  @media screen and (min-width: 769px) {
    grid-template-columns: repeat(4, 1fr);
  }

  // Mobile: 1 column
  @media screen and (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;
function Stats({ trips, kilometers }) {
  // 1.
  const numTrips = trips.length;

  // 2.
  const sales = trips.reduce((acc, cur) => acc + cur.price, 0);

  // 3.
  const priceKmRate = formatRate(sales / kilometers);

  return (
    <StatsGrid>
      <Stat
        title="Viajes"
        color="blue"
        icon={<HiOutlineArrowsRightLeft />}
        value={numTrips}
      />
      <Stat
        title="Ventas"
        color="green"
        icon={<HiOutlineBanknotes />}
        value={formatCurrency(sales)}
      />
      <Stat
        title="Kilometros"
        color="indigo"
        icon={<HiOutlineGlobeAlt />}
        value={formatMileage(kilometers)}
      />
      <Stat
        title="Tasa ventas / Km"
        color="yellow"
        icon={<HiOutlineChartBar />}
        value={priceKmRate}
      />
    </StatsGrid>
  );
}

export default Stats;
