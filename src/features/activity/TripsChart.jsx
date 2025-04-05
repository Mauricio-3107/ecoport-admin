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
import Heading from "../../ui/Heading";
import { useDarkMode } from "../../context/DarkModeContext";

const ChartBox = styled.div`
  background-color: ${(props) =>
    props.$isDarkMode ? "#18212f" : "var(--color-grey-0)"};
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);
  padding: 2.4rem 3.2rem;
  grid-column: 1 / -1;
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

const TotalTrips = styled.div`
  font-size: 2rem;
  font-weight: bold;
  text-align: center;
  color: ${(props) => (props.$isDarkMode ? "#0c91ea" : "#167cf9")};
`;

const NoDataMessage = styled.p`
  font-size: 1.6rem;
  color: ${(props) => (props.$isDarkMode ? "#e5e7eb" : "#374151")};
`;

function TripsChart({
  trips,
  title,
  height,
  totalTrips,
  periodEmptyMessageData,
}) {
  const { isDarkMode } = useDarkMode();

  const colors = isDarkMode
    ? { barFill: "#0c91ea", text: "#e5e7eb", background: "#18212f" }
    : { barFill: "#167cf9", text: "#374151", background: "#fff" };

  return (
    <ChartBox $isDarkMode={isDarkMode} $height={height}>
      <Heading as="h2">{title}</Heading>

      {trips.length === 0 ? (
        <NoDataMessage $isDarkMode={isDarkMode}>
          No hay datos disponibles para el periodo de {periodEmptyMessageData}
        </NoDataMessage>
      ) : (
        <>
          <TotalTrips $isDarkMode={isDarkMode}>
            Total: {totalTrips} viajes
          </TotalTrips>
          <ResponsiveContainer width="100%" height={height}>
            <BarChart data={trips}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="licensePlate"
                type="category"
                tick={{ fill: colors.text, fontSize: 12 }}
                interval={0}
              />
              <YAxis
                type="number"
                allowDecimals={false}
                tickFormatter={(tick) => Math.round(tick)}
                tick={{ fill: colors.text, fontSize: 12 }}
                domain={[0, "auto"]}
              />
              <Tooltip contentStyle={{ backgroundColor: colors.background }} />
              <Bar
                dataKey="trips"
                fill={colors.barFill}
                barSize={40}
                name="Número de Viajes"
              />
            </BarChart>
          </ResponsiveContainer>
        </>
      )}
    </ChartBox>
  );
}

export default TripsChart;
