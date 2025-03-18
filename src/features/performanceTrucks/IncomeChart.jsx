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

const TotalIncome = styled.div`
  font-size: 2rem;
  font-weight: bold;
  text-align: center;
  color: ${(props) => (props.$isDarkMode ? "#0c91ea" : "#167cf9")};
`;

const NoDataMessage = styled.p`
  font-size: 1.6rem;
  color: ${(props) => (props.$isDarkMode ? "#e5e7eb" : "#374151")};
`;

function IncomeChart({ incomeData, title, height, periodEmptyMessageData }) {
  const { isDarkMode } = useDarkMode();

  const colors = isDarkMode
    ? { barFill: "#0c91ea", text: "#e5e7eb", background: "#18212f" }
    : { barFill: "#167cf9", text: "#374151", background: "#fff" };

  const totalIncome = incomeData.reduce(
    (acc, truckData) => acc + truckData.income,
    0
  );

  return (
    <ChartBox $isDarkMode={isDarkMode} $height={height}>
      <Heading as="h2">{title}</Heading>
      {incomeData.length === 0 ? (
        <NoDataMessage $isDarkMode={isDarkMode}>
          No hay datos disponibles para el periodo de {periodEmptyMessageData}
        </NoDataMessage>
      ) : (
        <>
          <TotalIncome $isDarkMode={isDarkMode}>
            Total: $ {totalIncome}
          </TotalIncome>

          <ResponsiveContainer width="100%" height={height}>
            <BarChart layout="vertical" data={incomeData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                type="number"
                allowDecimals={false} // Ensures only whole numbers
                tickFormatter={(tick) => Math.round(tick)} // Extra safety measure
                tick={{ fill: colors.text, fontSize: 12 }}
                domain={[0, "auto"]} // Keeps it dynamic but whole numbers only
              />
              <YAxis
                dataKey="licensePlate"
                type="category"
                width={100}
                tick={{ fill: colors.text, fontSize: 12 }}
                interval={0}
              />
              <Tooltip contentStyle={{ backgroundColor: colors.background }} />
              <Bar
                dataKey="income"
                fill={colors.barFill}
                barSize={20}
                name="Ingresos ($)"
              />
            </BarChart>
          </ResponsiveContainer>
        </>
      )}
    </ChartBox>
  );
}

export default IncomeChart;
