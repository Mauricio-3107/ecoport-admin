import {
  HiOutlineArrowsRightLeft,
  HiOutlineBanknotes,
  HiOutlineChartBar,
  HiOutlineGlobeAlt,
} from "react-icons/hi2";
import StatPickup from "./StatPickup";
import { formatCurrency, formatKilometers, formatRate } from "../../utils/helpers";

function Stats({ trips, kilometers }) {
  // 1.
  const numTrips = trips.length;

  // 2.
  const sales = trips.reduce((acc, cur) => acc + cur.price, 0);

  // 3.
  const priceKmRate = formatRate(sales / kilometers);

  return (
    <>
      <StatPickup
        title="Placa"
        color="blue"
        icon={<HiOutlineArrowsRightLeft />}
        value={numTrips}
      />
      <StatPickup
        title="Ventas"
        color="green"
        icon={<HiOutlineBanknotes />}
        value={formatCurrency(sales)}
      />
      <StatPickup
        title="Kilometros"
        color="indigo"
        icon={<HiOutlineGlobeAlt />}
        value={formatKilometers(kilometers)}
      />
      <StatPickup
        title="Tasa ventas / Km"
        color="yellow"
        icon={<HiOutlineChartBar />}
        value={priceKmRate}
      />
    </>
  );
}

export default Stats;
