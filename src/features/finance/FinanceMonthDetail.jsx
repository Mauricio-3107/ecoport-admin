import styled from "styled-components";
import Spinner from "../../ui/Spinner";
import StackedCostRevenueChart from "./StackedCostRevenueChart";
import { useFinanceMonth } from "./useFinanceMonth";
import VerticalBarChartBox from "./VerticalBarChartBox";
import Empty from "../../ui/Empty";
import Heading from "../../ui/Heading";
import useMediaQuery from "../../hooks/useMediaQuery";

const monthNamesSpanish = [
  "Enero",
  "Febrero",
  "Marzo",
  "Abril",
  "Mayo",
  "Junio",
  "Julio",
  "Agosto",
  "Septiembre",
  "Octubre",
  "Noviembre",
  "Diciembre",
];

function formatMonthLiteral(monthStr) {
  // Expect monthStr in "YYYY-MM" format, e.g., "2025-03"
  const [year, month] = monthStr.split("-");
  const monthIndex = parseInt(month, 10) - 1;
  return `${monthNamesSpanish[monthIndex]} ${year}`;
}

const StyledFinanceMonthDetail = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: auto auto auto auto;
  gap: 2.4rem;
`;

function FinanceMonthDetail() {
  const isMobile = useMediaQuery("(max-width: 768px)");

  const { isLoading, financeMonth, month } = useFinanceMonth();
  if (isLoading) return <Spinner />;

  if (!financeMonth || financeMonth.length === 0)
    return <Empty resourceName={"dato disponibles para este mes"} />;
  const sortedData = [...financeMonth].sort((a, b) =>
    a.licensePlate.localeCompare(b.licensePlate, "es")
  );
  const monthLiteral = formatMonthLiteral(month);
  
  return (
    <>
      <Heading as={isMobile ? "h3" : "h1"}>{monthLiteral}</Heading>
      <StyledFinanceMonthDetail>
        <StackedCostRevenueChart data={sortedData} />
        <VerticalBarChartBox
          title="Costos por camión"
          data={sortedData}
          dataKey="totalCost"
          color="#c0392b"
          barName="Costo"
        />
        <VerticalBarChartBox
          title="Ingresos por camión"
          data={sortedData}
          dataKey="totalRevenue"
          color="#27ae60"
          barName="Ingreso"
        />
        <VerticalBarChartBox
          title="Utilidad por camión"
          data={sortedData}
          dataKey="profit"
          color="#2980b9"
          barName="Utilidad"
        />
      </StyledFinanceMonthDetail>
    </>
  );
}

export default FinanceMonthDetail;
