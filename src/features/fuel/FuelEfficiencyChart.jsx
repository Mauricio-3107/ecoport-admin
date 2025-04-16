import styled from "styled-components";
import DashboardBoxFuel from "./DashboardBoxFuel";
import Heading from "../../ui/Heading";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { useDarkMode } from "../../context/DarkModeContext";
import { format } from "date-fns";

const StyledFuelChart = styled(DashboardBoxFuel)`
  grid-column: 1 / -1;

  & .recharts-cartesian-grid-horizontal line,
  & .recharts-cartesian-grid-vertical line {
    stroke: var(--color-grey-300);
  }
`;

function FuelEfficiencyChart({ fuelTruckId }) {
  const { isDarkMode } = useDarkMode();
  console.log(fuelTruckId);

  const data = fuelTruckId.map((record) => ({
    label: format(new Date(record.fuelDate), "MMM dd"),
    fuelEfficiency: record.fuelEfficiency,
  }));

  const colors = isDarkMode
    ? {
        fuelEfficiency: { stroke: "#10b981", fill: "#10b981" },
        text: "#e5e7eb",
        background: "#18212f",
      }
    : {
        fuelEfficiency: { stroke: "#10b981", fill: "#a7f3d0" },
        text: "#374151",
        background: "#fff",
      };

  return (
    <StyledFuelChart>
      <Heading as="h2">Eficiencia de Combustible en el Tiempo</Heading>

      <ResponsiveContainer height={300} width="100%">
        <AreaChart data={data}>
          <XAxis
            dataKey="label"
            tick={{ fill: colors.text }}
            tickLine={{ stroke: colors.text }}
          />
          <YAxis
            unit=" km/L"
            tick={{ fill: colors.text }}
            tickLine={{ stroke: colors.text }}
          />
          <CartesianGrid strokeDasharray="4" />
          <Tooltip contentStyle={{ backgroundColor: colors.background }} />
          <Area
            dataKey="fuelEfficiency"
            type="monotone"
            stroke={colors.fuelEfficiency.stroke}
            fill={colors.fuelEfficiency.fill}
            strokeWidth={2}
            name="Eficiencia combustible"
            unit=" Km/L"
          />
        </AreaChart>
      </ResponsiveContainer>
    </StyledFuelChart>
  );
}

export default FuelEfficiencyChart;
