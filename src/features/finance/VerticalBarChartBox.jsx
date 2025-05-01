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
import useMediaQuery from "../../hooks/useMediaQuery";

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
  height,
  dataKey,
  color,
  barName,
  onBarClick,
}) {
  const isMobile = useMediaQuery("(max-width: 768px)");

  const { isDarkMode } = useDarkMode();
  const responsiveHeight = isMobile ? 600 : 450;
  const lastHeight = height || responsiveHeight;

  if (!data || data.length === 0)
    return (
      <ChartBox $isDarkMode={isDarkMode} $height={lastHeight}>
        <Heading as="h2">{title} (Bs)</Heading>
        <p>No data for this month.</p>
      </ChartBox>
    );

  return (
    <ChartBox $isDarkMode={isDarkMode} $height={lastHeight}>
      <Heading as="h2">{title} (Bs)</Heading>
      <ResponsiveContainer width="100%" height={lastHeight}>
        <BarChart
          data={data}
          layout={isMobile ? "vertical" : "horizontal"}
          margin={isMobile ? { left: -20 } : { bottom: 50 }}
          onClick={(e) => {
            if (onBarClick && e?.activePayload?.[0]) {
              const truck = e.activePayload[0].payload;
              onBarClick(truck);
            }
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          {isMobile ? (
            <>
              <YAxis
                type="category"
                dataKey="licensePlate"
                tick={{ fontSize: 14, fill: isDarkMode ? "#fff" : "#111" }}
                width={100}
              />
              <XAxis
                type="number"
                tick={{ fontSize: 14, fill: isDarkMode ? "#fff" : "#111" }}
              />
            </>
          ) : (
            <>
              <XAxis
                dataKey="licensePlate"
                interval={0}
                angle={-35}
                textAnchor="end"
                tick={{ fontSize: 14, fill: isDarkMode ? "#fff" : "#111" }}
              />
              <YAxis
                tick={{ fontSize: 14, fill: isDarkMode ? "#fff" : "#111" }}
              />
            </>
          )}
          {dataKey === "totalCost" ? (
            <Tooltip
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  const {
                    oilCost,
                    salaryCost,
                    fuelConsumptionCost,
                    dailyExpensesCost,
                    maintenanceCost,
                    tiresCost,
                    travelCost,
                    totalCost,
                    licensePlate,
                  } = payload[0].payload;

                  return (
                    <div
                      style={{
                        backgroundColor: isDarkMode ? "#1f2937" : "#fff",
                        color: isDarkMode ? "#fff" : "#111",
                        borderRadius: "10px",
                        boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
                        padding: "1.2rem",
                        fontSize: "1.5rem",
                        maxWidth: "320px",
                        maxHeight: "300px",
                        overflowY: "auto",
                        lineHeight: 1.6,
                      }}
                    >
                      <strong
                        style={{
                          fontSize: "1.6rem",
                          display: "block",
                          marginBottom: "0.8rem",
                        }}
                      >
                        {licensePlate} - Total: Bs{" "}
                        {totalCost.toLocaleString("es-BO", {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        })}
                      </strong>
                      <ul style={{ paddingLeft: "1.6rem", margin: 0 }}>
                        <li>
                          🛢️ Aceite: Bs{" "}
                          {oilCost.toLocaleString("es-BO", {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                          })}
                        </li>
                        <li>
                          👨‍🔧 Sueldo: Bs{" "}
                          {salaryCost.toLocaleString("es-BO", {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                          })}
                        </li>
                        <li>
                          ⛽ Combustible: Bs{" "}
                          {fuelConsumptionCost.toLocaleString("es-BO", {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                          })}
                        </li>
                        <li>
                          🍴 Gastos diarios: Bs{" "}
                          {dailyExpensesCost.toLocaleString("es-BO", {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                          })}
                        </li>
                        <li>
                          🔧 Mantenimiento: Bs{" "}
                          {maintenanceCost.toLocaleString("es-BO", {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                          })}
                        </li>
                        <li>
                          🛞 Llantas: Bs{" "}
                          {tiresCost.toLocaleString("es-BO", {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                          })}
                        </li>
                        <li>
                          🚚 Viajes: Bs{" "}
                          {travelCost.toLocaleString("es-BO", {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                          })}
                        </li>
                      </ul>
                    </div>
                  );
                }
                return null;
              }}
            />
          ) : (
            <Tooltip
              formatter={(value) =>
                `Bs ${Number(value).toLocaleString("es-BO", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}`
              }
              labelFormatter={(label) =>
                dataKey === "totalRevenue"
                  ? `${label}`
                  : dataKey === "profit"
                  ? `${label}`
                  : label
              }
              contentStyle={{
                backgroundColor: isDarkMode ? "#1f2937" : "#fff",
                color: isDarkMode ? "#fff" : "#111",
                borderRadius: "10px",
                padding: "1rem",
                fontSize: "1.5rem",
                boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
              }}
              labelStyle={{ fontSize: "1.6rem", fontWeight: "bold" }}
            />
          )}

          <Bar dataKey={dataKey} fill={color} name={barName} barSize={40} />
        </BarChart>
      </ResponsiveContainer>
    </ChartBox>
  );
}

export default VerticalBarChartBox;
