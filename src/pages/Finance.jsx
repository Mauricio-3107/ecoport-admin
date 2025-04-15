// File: Finance.jsx
import FinanceLayout from "../features/finance/FinanceLayout";
import { useMonthImages } from "../features/finance/useMonthlyImages";
import Heading from "../ui/Heading";
import Row from "../ui/Row";
import Spinner from "../ui/Spinner";

function Finance() {
  // Fake data; you can replace these with real aggregated data
  const fakeMonthlyData = [
    {
      month: "2025-01",
      backgroundImage:
        "https://iyvqjuxxoevmwkzvhsgv.supabase.co/storage/v1/object/public/truck-images//mom.jpg",
    },
    {
      month: "2025-02",
      backgroundImage:
        "https://iyvqjuxxoevmwkzvhsgv.supabase.co/storage/v1/object/public/truck-images//mom.jpg",
    },
    {
      month: "2025-03",
      backgroundImage:
        "https://iyvqjuxxoevmwkzvhsgv.supabase.co/storage/v1/object/public/truck-images//mom.jpg",
    },
    {
      month: "2025-04",
      backgroundImage:
        "https://iyvqjuxxoevmwkzvhsgv.supabase.co/storage/v1/object/public/truck-images//mom.jpg",
    },
    {
      month: "2025-05",
      backgroundImage:
        "https://iyvqjuxxoevmwkzvhsgv.supabase.co/storage/v1/object/public/truck-images//mom.jpg",
    },
    {
      month: "2025-06",
      backgroundImage:
        "https://iyvqjuxxoevmwkzvhsgv.supabase.co/storage/v1/object/public/truck-images//mom.jpg",
    },
    {
      month: "2025-07",
      backgroundImage:
        "https://iyvqjuxxoevmwkzvhsgv.supabase.co/storage/v1/object/public/truck-images//mom.jpg",
    },
    {
      month: "2025-08",
      backgroundImage:
        "https://iyvqjuxxoevmwkzvhsgv.supabase.co/storage/v1/object/public/truck-images//mom.jpg",
    },
    {
      month: "2025-09",
      backgroundImage:
        "https://iyvqjuxxoevmwkzvhsgv.supabase.co/storage/v1/object/public/truck-images//mom.jpg",
    },
    {
      month: "2025-10",
      backgroundImage:
        "https://iyvqjuxxoevmwkzvhsgv.supabase.co/storage/v1/object/public/truck-images//mom.jpg",
    },
    {
      month: "2025-11",
      backgroundImage:
        "https://iyvqjuxxoevmwkzvhsgv.supabase.co/storage/v1/object/public/truck-images//mom.jpg",
    },
    {
      month: "2025-12",
      backgroundImage:
        "https://iyvqjuxxoevmwkzvhsgv.supabase.co/storage/v1/object/public/truck-images//mom.jpg",
    },
  ];
  const { isLoading, monthImages } = useMonthImages();
  if (isLoading) return <Spinner />;
  const monthlyData = monthImages;

  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">Finances</Heading>
      </Row>
      <FinanceLayout monthlyData={monthlyData} resourcePath="finance" />
    </>
  );
}

export default Finance;
