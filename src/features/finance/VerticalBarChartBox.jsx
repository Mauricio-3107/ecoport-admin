import styled from "styled-components";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
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
  align-items: center;
  justify-content: center;
  min-height: ${(props) => props.$height}px;

  & .recharts-cartesian-grid line {
    stroke: var(--color-grey-200);
  }
`;

function VerticalBarChartBox({
  title,
  data,
  height = 450,
  dataKey,
  color,
  barName,
  onBarClick,
}) {
  const { isDarkMode } = useDarkMode();

  if (!data || data.length === 0)
    return (
      <ChartBox $isDarkMode={isDarkMode} $height={height}>
        <Heading as="h2">{title} (Bs)</Heading>
        <p>No data for this month.</p>
      </ChartBox>
    );

  return (
    <ChartBox $isDarkMode={isDarkMode} $height={height}>
      <Heading as="h2">{title} (Bs)</Heading>
      <ResponsiveContainer width="100%" height={height - 60}>
        <BarChart
          data={data}
          margin={{ bottom: 50 }}
          onClick={(e) => {
            if (onBarClick && e?.activePayload?.[0]) {
              const truck = e.activePayload[0].payload;
              onBarClick(truck);
            }
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="licensePlate"
            interval={0}
            angle={-35}
            textAnchor="end"
            tick={{ fontSize: 12 }}
          />
          <YAxis tick={{ fontSize: 12 }} />
          <Tooltip
            formatter={(value) => `Bs ${Number(value).toLocaleString()}`}
          />
          <Bar dataKey={dataKey} fill={color} name={barName} barSize={40} />
        </BarChart>
      </ResponsiveContainer>
    </ChartBox>
  );
}

export default VerticalBarChartBox;
