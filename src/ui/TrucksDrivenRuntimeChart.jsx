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

const ChartBox = styled.div`
  background-color: ${(props) =>
    props.$isDarkMode ? "#18212f" : "var(--color-grey-0)"};
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);
  padding: 2.4rem 3.2rem;
  grid-column: 3 / span 2;
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
  align-items: center; /* Center the message */
  justify-content: center;
  min-height: ${(props) => props.$height}px; /* Ensure proper height */

  & .recharts-cartesian-grid line {
    stroke: var(--color-grey-200);
  }
`;

const TotalRuntime = styled.div`
  font-size: 2rem;
  font-weight: bold;
  text-align: center;
  color: ${(props) => (props.$isDarkMode ? "#ea580c" : "#f97316")};
`;

const NoDataMessage = styled.p`
  font-size: 1.6rem;
  color: ${(props) => (props.$isDarkMode ? "#e5e7eb" : "#374151")};
`;

function formatRuntime(seconds) {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);

  if (hours === 0) return `${minutes} min`; // Show only minutes if < 1 hour
  return `${hours}h ${minutes}m`; // Show hours and minutes normally
}

function convertSecondsToHours(seconds) {
  return (seconds / 3600).toFixed(2); // Convert to hours with 2 decimal places
}

function TrucksDrivenRuntimeChart({
  trucksMileageRuntime,
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
    period === "Today" ? `runtime${period}` : `runtimeLast${period}Days`;

  const truckData = trucksMileageRuntime.map((truck) => ({
    licensePlate: truck.licensePlate,
    runtime: convertSecondsToHours(truck[periodPropertyTruckData]) ?? 0, // Convert to hours
    formattedRuntime: formatRuntime(truck[periodPropertyTruckData]) ?? 0, // Keep human-readable format
  }));

  const totalRuntime = trucksMileageRuntime.reduce(
    (sum, truck) => sum + truck[periodPropertyTruckData],
    0
  );

  const maxRuntime = Math.max(...truckData.map((t) => t.runtime), 10); // Ensure minimum range

  const colors = isDarkMode
    ? { barFill: "#ea580c", text: "#e5e7eb", background: "#18212f" }
    : { barFill: "#f97316", text: "#374151", background: "#fff" };

  return (
    <ChartBox $isDarkMode={isDarkMode} $height={height}>
      <Heading as="h2">{title}</Heading>

      {trucksMileageRuntime.length === 0 ? (
        <NoDataMessage $isDarkMode={isDarkMode}>
          No hay datos disponibles para el periodo de {periodEmptyMessageData}
        </NoDataMessage>
      ) : (
        <>
          <TotalRuntime $isDarkMode={isDarkMode}>
            Total: {formatRuntime(totalRuntime)}
          </TotalRuntime>

          <ResponsiveContainer width="100%" height={height}>
            <BarChart
              layout="vertical"
              data={truckData.filter((truck) => truck.runtime > 0)}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                type="number"
                tickFormatter={(tick) => `${tick}h`} // Show "hours" on X-axis
                tick={{ fill: colors.text, fontSize: 12 }}
                domain={[0, maxRuntime]}
              />
              <YAxis
                dataKey="licensePlate"
                type="category"
                width={100}
                tick={{ fill: colors.text, fontSize: 12 }}
                interval={0}
              />
              <Tooltip
                contentStyle={{ backgroundColor: colors.background }}
                formatter={(value) => [formatRuntime(value * 3600), "Tiempo"]}
              />
              <Bar
                dataKey="runtime"
                fill={colors.barFill}
                barSize={20}
                name="Tiempo (h)"
              />
            </BarChart>
          </ResponsiveContainer>
        </>
      )}
    </ChartBox>
  );
}

export default TrucksDrivenRuntimeChart;
