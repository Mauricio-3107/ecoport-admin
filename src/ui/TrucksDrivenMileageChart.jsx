import styled from "styled-components";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import Heading from "./Heading";
import { useDarkMode } from "../context/DarkModeContext";
import { formatMileage } from "../utils/helpers";

const ChartBox = styled.div`
  background-color: ${(props) =>
    props.$isDarkMode ? "#18212f" : "var(--color-grey-0)"};
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);
  padding: 2.4rem 3.2rem;
  grid-column: 1 / span 2;
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
  align-items: center; /* Center the message */
  justify-content: center;
  min-height: ${(props) => props.$height}px; /* Ensure proper height */

  & .recharts-cartesian-grid line {
    stroke: var(--color-grey-200);
  }

  @media screen and (max-width: 768px) {
    grid-column: 1 / -1; /* <— This forces full width on mobile */
    padding: 1.6rem;
  }
`;

const TotalMileage = styled.div`
  font-size: 2rem;
  font-weight: bold;
  text-align: center;
  color: ${(props) => (props.$isDarkMode ? "#ea580c" : "#f97316")};
`;

const NoDataMessage = styled.p`
  font-size: 1.6rem;
  color: ${(props) => (props.$isDarkMode ? "#e5e7eb" : "#374151")};
`;

function TrucksDrivenMileageChart({
  trucksMileageRuntime,
  totalMileage,
  title,
  height,
  period,
  periodEmptyMessageData,
}) {
  const { isDarkMode } = useDarkMode();

  // Valid periods
  const validPeriods = ["Today", "7", "30"];

  if (!validPeriods.includes(period)) {
    console.error(`Invalid period "${period}". Expected: Today, 7, or 30.`);
    return (
      <ChartBox $isDarkMode={isDarkMode}>
        <Heading as="h2">{title}</Heading>
        ⚠️ Error: Invalid period provided.
      </ChartBox>
    );
  }

  const periodPropertyTruckData =
    period === "Today" ? `miles${period}` : `milesLast${period}Days`;

  const periodPropertyTotalMileage =
    period === "Today" ? `${period.toLowerCase()}` : `last${period}Days`;

  const truckData = trucksMileageRuntime.map((truck) => ({
    licensePlate: truck.licensePlate,
    mileage: truck[periodPropertyTruckData] ?? 0,
  }));

  const colors = isDarkMode
    ? { barFill: "#ea580c", text: "#e5e7eb", background: "#18212f" }
    : { barFill: "#f97316", text: "#374151", background: "#fff" };

  return (
    <ChartBox $isDarkMode={isDarkMode}>
      <Heading as="h2">{title}</Heading>
      {trucksMileageRuntime.length === 0 ? (
        <NoDataMessage $isDarkMode={isDarkMode}>
          No hay datos disponibles para el periodo de {periodEmptyMessageData}
        </NoDataMessage>
      ) : (
        <>
          <TotalMileage $isDarkMode={isDarkMode}>
            Total: {formatMileage(totalMileage[periodPropertyTotalMileage])}
          </TotalMileage>

          <ResponsiveContainer width="100%" height={height}>
            <BarChart
              layout="vertical"
              data={truckData.filter((truck) => truck.mileage > 0)}
              // data={truckData}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis type="number" tick={{ fill: colors.text, fontSize: 12 }} />
              <YAxis
                dataKey="licensePlate"
                type="category"
                width={100}
                tick={{ fill: colors.text, fontSize: 13 }}
                interval={0} // Forces all labels to be displayed
              />
              <Tooltip
                contentStyle={{ backgroundColor: colors.background }}
                labelFormatter={(label) => <strong>{label}</strong>}
              />
              <Bar
                dataKey="mileage"
                fill={colors.barFill}
                barSize={20}
                name="Kilómetros"
              />
            </BarChart>
          </ResponsiveContainer>
        </>
      )}
    </ChartBox>
  );
}

export default TrucksDrivenMileageChart;
