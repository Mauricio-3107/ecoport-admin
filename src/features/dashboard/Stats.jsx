import {
  HiOutlineArrowsRightLeft,
  HiOutlineBanknotes,
  HiOutlineChartBar,
  HiOutlineGlobeAlt,
} from "react-icons/hi2";
import Stat from "./Stat";
import { formatCurrency, formatMileage, formatRate } from "../../utils/helpers";

function Stats({ trips, kilometers }) {
  // 1.
  const numTrips = trips.length;

  // 2.
  const sales = trips.reduce((acc, cur) => acc + cur.price, 0);

  // 3.
  const priceKmRate = formatRate(sales / kilometers);

  return (
    <>
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
    </>
  );
}

export default Stats;
