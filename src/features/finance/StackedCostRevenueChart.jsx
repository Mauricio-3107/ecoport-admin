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
            tick={{ fontSize: 14, fill: isDarkMode ? "#fff" : "#111" }}
          />
          <YAxis tick={{ fontSize: 14, fill: isDarkMode ? "#fff" : "#111" }} />
          <Tooltip
            content={({ active, payload }) => {
              if (active && payload && payload.length) {
                const { licensePlate, totalCost, totalRevenue } =
                  payload[0].payload;
                return (
                  <div
                    style={{
                      backgroundColor: isDarkMode ? "#1f2937" : "#fff",
                      color: isDarkMode ? "#fff" : "#111",
                      borderRadius: "10px",
                      boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
                      padding: "1.6rem",
                      fontSize: "1.6rem",
                      maxWidth: "240px",
                      lineHeight: 1.6,
                    }}
                  >
                    <div
                      style={{
                        fontWeight: "bold",
                        fontSize: "1.6rem",
                        marginBottom: "1rem",
                      }}
                    >
                      {licensePlate}
                    </div>
                    <p>
                      <strong>Ingresos:</strong> Bs{" "}
                      {totalRevenue.toLocaleString("es-BO", {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}
                    </p>
                    <p>
                      <strong>Costos:</strong> Bs{" "}
                      {totalCost.toLocaleString("es-BO", {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}
                    </p>
                  </div>
                );
              }
              return null;
            }}
          />

          <Bar dataKey="totalCost" stackId="a" fill="#c0392b" name="Costos" />
          <Bar
            dataKey="totalRevenue"
            stackId="a"
            fill="#27ae60"
            name="Ingresos"
          />
        </BarChart>
      </ResponsiveContainer>
    </ChartBox>
  );
}

export default StackedCostRevenueChart;
