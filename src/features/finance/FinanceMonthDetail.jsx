import styled from "styled-components";
import Spinner from "../../ui/Spinner";
import StackedCostRevenueChart from "./StackedCostRevenueChart";
import { useFinanceMonth } from "./useFinanceMonth";
import VerticalBarChartBox from "./VerticalBarChartBox";

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
  return (
    <StyledFinanceMonthDetail>
      <StackedCostRevenueChart data={financeMonth} />
      <VerticalBarChartBox
        title="Costos por camión"
        data={financeMonth}
        dataKey="totalCost"
        color="#e74c3c"
        barName="Costo"
      />
      <VerticalBarChartBox
        title="Ingresos por camión"
        data={financeMonth}
        dataKey="totalRevenue"
        color="#2ecc71"
        barName="Ingreso"
      />
      <VerticalBarChartBox
        title="Ganancia por camión"
        data={financeMonth}
        dataKey="profit"
        color="#3498db"
        barName="Ganancia"
      />
    </StyledFinanceMonthDetail>
  );
}

export default FinanceMonthDetail;
