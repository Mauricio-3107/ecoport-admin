import styled from "styled-components";
import Spinner from "../../ui/Spinner";
import StatsPickup from "./StatsPickup";
// import SalesChart from "./SalesChart";
import { useSearchParams } from "react-router-dom";
import { usePickupMileageRuntime } from "./usePickupMileageRuntime";
import PickupImage from "./PickupImage";

const StyledDashboardLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  /* grid-template-rows: auto auto 34rem; */
  grid-template-rows: auto;
  gap: 2.4rem;

  @media screen and (max-width: 768px) {
    grid-template-columns: 1fr;
    /* grid-template-rows: 1fr; */
    row-gap: 2.4rem;
    overflow-x: auto;
  }
`;

function PickupLayout() {
  // searchParams
  const [searchParams] = useSearchParams();

  //Filter value. It is already formatted on the desired value property
  const filterValuePeriod = !searchParams.get("last")
    ? "Today"
    : searchParams.get("last");

  // Mileage and runtime
  const { isLoading, pickupMileageRuntime } = usePickupMileageRuntime();

  const periodMilesPropertyPickup =
    filterValuePeriod === "Today"
      ? `miles${filterValuePeriod}`
      : `milesLast${filterValuePeriod}Days`;

  const periodRuntimePropertyPickup =
    filterValuePeriod === "Today"
      ? `runtime${filterValuePeriod}`
      : `runtimeLast${filterValuePeriod}Days`;

  if (isLoading) return <Spinner />;

  const kilometers = pickupMileageRuntime[periodMilesPropertyPickup];
  const runtime = pickupMileageRuntime[periodRuntimePropertyPickup];

  return (
    <StyledDashboardLayout>
      <PickupImage imageUrl={pickupMileageRuntime.image} />
      <StatsPickup
        licensePlate={pickupMileageRuntime.licensePlate}
        kilometers={kilometers}
        runtime={runtime}
      />
    </StyledDashboardLayout>
  );
}

export default PickupLayout;
