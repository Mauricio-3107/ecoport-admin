import styled from "styled-components";
import FuelEfficiencyChart from "./FuelEfficiencyChart";

const StyledFuelTruckIdLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  /* grid-template-rows: auto auto 34rem; */
  grid-template-rows: auto;
  gap: 2.4rem;
`;

function FuelTruckIdLayout({ fuelTruckId }) {
  return (
    <StyledFuelTruckIdLayout>
      <FuelEfficiencyChart fuelTruckId={fuelTruckId} />
    </StyledFuelTruckIdLayout>
  );
}

export default FuelTruckIdLayout;
