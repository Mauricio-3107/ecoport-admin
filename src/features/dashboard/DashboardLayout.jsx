import styled from "styled-components";
import Spinner from "../../ui/Spinner";
import Stats from "./Stats";
import SalesChart from "./SalesChart";
import { useRecentTrips } from "./useRecentTrips";

const StyledDashboardLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: auto 34rem auto;
  gap: 2.4rem;
`;

function DashboardLayout() {
  // const { bookings, isLoading: isLoadingBookings } = useRecentBookings();
  // const {
  //   stays,
  //   confirmedStays,
  //   isLoading: isLoadingStays,
  //   numDays,
  // } = useRecentStays();
  // const { cabins, isLoading: isLoadingCabins } = useCabins();

  // if (isLoadingBookings || isLoadingStays || isLoadingCabins)
  //   return <Spinner />;

  const { trips, isLoading: isLoadingTrips, numDays } = useRecentTrips();
  const kilometers = 20000;

  if (isLoadingTrips) return <Spinner />;

  return (
    <StyledDashboardLayout>
      <Stats
        trips={trips}
        kilometers={kilometers}
        // numDays={numDays}
        // cabinCount={cabins.length}
      />
      {/* <TodayActivity /> */}
      {/* <DurationChart confirmedStays={confirmedStays} /> */}
      {/* <SalesChart bookings={bookings} numDays={numDays} /> */}
      <SalesChart trips={trips} numDays={numDays} />
    </StyledDashboardLayout>
  );
}

export default DashboardLayout;
