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
import styled from "styled-components";

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

function StackedCostRevenueChart({ data }) {
  const { isDarkMode } = useDarkMode();

  return (
    <ChartBox $isDarkMode={isDarkMode} $height={450}>
      <Heading as="h2">Costos vs Ingresos (Bs)</Heading>
      <ResponsiveContainer width="100%" height={400}>
        <BarChart data={data} margin={{ bottom: 50 }}>
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
          <Bar dataKey="totalCost" stackId="a" fill="#e74c3c" name="Costos" />
          <Bar
            dataKey="totalRevenue"
            stackId="a"
            fill="#2ecc71"
            name="Ingresos"
          />
        </BarChart>
      </ResponsiveContainer>
    </ChartBox>
  );
}

export default StackedCostRevenueChart;
