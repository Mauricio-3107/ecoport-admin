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
import useMediaQuery from "../../hooks/useMediaQuery";

const ChartBox = styled.div`
  grid-column: 1 / -1;
  background-color: ${(props) =>
    props.$isDarkMode ? "#18212f" : "var(--color-grey-0)"};
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);
  padding: 2.4rem 3.2rem;
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
    padding: 1.6rem;
  }
`;

const NoDataMessage = styled.p`
  font-size: 1.6rem;
  color: ${(props) => (props.$isDarkMode ? "#e5e7eb" : "#374151")};
`;

function LoadUtilizationChart({
  trucksLoadData,
  title,
  height,
  periodEmptyMessageData,
}) {
  const { isDarkMode } = useDarkMode();
  const isMobile = useMediaQuery("(max-width: 768px)");

  const colors = isDarkMode
    ? { barFill: "#e0e7ff", text: "#e5e7eb", background: "#18212f" }
    : { barFill: "#4338ca", text: "#374151", background: "#fff" };

  return (
    <ChartBox $isDarkMode={isDarkMode} $height={height}>
      <Heading as="h2">{title}</Heading>

      {/* ✅ Show message if no data */}
      {trucksLoadData.length === 0 ? (
        <NoDataMessage $isDarkMode={isDarkMode}>
          No hay datos disponibles para el periodo de {periodEmptyMessageData}
        </NoDataMessage>
      ) : (
        <ResponsiveContainer width="100%" height={height}>
          <BarChart
            data={trucksLoadData}
            layout={isMobile ? "vertical" : "horizontal"}
          >
            <CartesianGrid strokeDasharray="3 3" />

            {isMobile ? (
              <>
                <XAxis
                  type="number"
                  domain={[0, 100]}
                  tick={{ fill: colors.text, fontSize: 12 }}
                />
                <YAxis
                  dataKey="licensePlate"
                  type="category"
                  width={80}
                  tick={{ fill: colors.text, fontSize: 12 }}
                  interval={0}
                />
              </>
            ) : (
              <>
                <XAxis
                  dataKey="licensePlate"
                  type="category"
                  tick={{ fill: colors.text, fontSize: 12 }}
                />
                <YAxis
                  type="number"
                  domain={[0, 100]}
                  tick={{ fill: colors.text, fontSize: 12 }}
                  label={{
                    value: "% Utilización",
                    angle: -90,
                    position: "insideLeft",
                    fill: colors.text,
                  }}
                />
              </>
            )}

            <Tooltip
              contentStyle={{ backgroundColor: colors.background }}
              formatter={(value) => [`${value} %`, "Capacidad utilizada"]}
              labelFormatter={(label) => <strong>{label}</strong>}
            />
            <Bar
              dataKey="loadUtilization"
              fill={colors.barFill}
              barSize={40}
              name="Capacidad utilizada (%)"
            />
          </BarChart>
        </ResponsiveContainer>
      )}
    </ChartBox>
  );
}

export default LoadUtilizationChart;
