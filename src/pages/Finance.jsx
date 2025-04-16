// File: Finance.jsx
import FinanceLayout from "../features/finance/FinanceLayout";
import { useMonthImages } from "../features/finance/useMonthlyImages";
import Heading from "../ui/Heading";
import Row from "../ui/Row";
import Spinner from "../ui/Spinner";

function Finance() {
  const { isLoading, monthImages } = useMonthImages();
  if (isLoading) return <Spinner />;
  const monthlyData = monthImages;

  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">Finanzas</Heading>
      </Row>
      <FinanceLayout monthlyData={monthlyData} resourcePath="finance" />
    </>
  );
}

export default Finance;
