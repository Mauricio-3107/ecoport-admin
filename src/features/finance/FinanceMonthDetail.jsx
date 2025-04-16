import styled from "styled-components";
import Spinner from "../../ui/Spinner";
import StackedCostRevenueChart from "./StackedCostRevenueChart";
import { useFinanceMonth } from "./useFinanceMonth";
import VerticalBarChartBox from "./VerticalBarChartBox";
import Empty from "../../ui/Empty";

const StyledFinanceMonthDetail = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: auto auto auto auto;
  gap: 2.4rem;
`;

function FinanceMonthDetail() {
  const { isLoading, financeMonth } = useFinanceMonth();
  if (isLoading) return <Spinner />;
  console.log(financeMonth);
  if (!financeMonth || financeMonth.length === 0)
    return <Empty resourceName={"dato disponibles para este mes"} />;
  return (
    <StyledFinanceMonthDetail>
      <StackedCostRevenueChart data={financeMonth} />
      <VerticalBarChartBox
        title="Costos por camión"
        data={financeMonth}
        dataKey="totalCost"
        color="#c0392b"
        barName="Costo"
      />
      <VerticalBarChartBox
        title="Ingresos por camión"
        data={financeMonth}
        dataKey="totalRevenue"
        color="#27ae60"
        barName="Ingreso"
      />
      <VerticalBarChartBox
        title="Ganancia por camión"
        data={financeMonth}
        dataKey="profit"
        color="#2980b9"
        barName="Ganancia"
      />
    </StyledFinanceMonthDetail>
  );
}

export default FinanceMonthDetail;
