import styled from "styled-components";
import Spinner from "../../ui/Spinner";
import StatsPickup from "./StatsPickup";
// import SalesChart from "./SalesChart";
import { useRecentTrips } from "./../dashboard/useRecentTrips";
import { useTotalMileageTrucks } from "./../dashboard/useTotalMileageTrucks";
import { useSearchParams } from "react-router-dom";

const StyledDashboardLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  /* grid-template-rows: auto auto 34rem; */
  grid-template-rows: auto auto auto auto;
  gap: 2.4rem;
`;

function PickupLayout() {
  // Placeholder
  // const { isLoading: isLoading2, confirmedStays } = useRecentStays();

  // Recent trips
  const { trips, isLoading: isLoadingTrips } = useRecentTrips();

  // Total Mileage trucks
  const { totalMileageTrucks, isLoading: isLoadingTotalMileage } =
    useTotalMileageTrucks();

  // searchParams
  const [searchParams] = useSearchParams();

  // Loading states
  if (isLoadingTrips || isLoadingTotalMileage) return <Spinner />;

  //Filer value
  const filterValue = !searchParams.get("last")
    ? 7
    : Number(searchParams.get("last"));

  let pastKilometers;
  if (filterValue === 7) pastKilometers = totalMileageTrucks.last7Days;
  if (filterValue === 30) pastKilometers = totalMileageTrucks.last30Days;

  return (
    <StyledDashboardLayout>
      <StatsPickup trips={trips} kilometers={pastKilometers} />
      {/* <SalesChart trips={trips} numDays={numDays} /> */}
    </StyledDashboardLayout>
  );
}

export default PickupLayout;
