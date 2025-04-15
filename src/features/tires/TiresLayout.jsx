import styled from "styled-components";
import { useSearchParams } from "react-router-dom";

import { useDarkMode } from "../../context/DarkModeContext";
import TruckCard from "../../ui/TruckCard";
import CreateTiresForm from "./CreateTiresForm";

const TrucksContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 20px;
  padding: 20px;
  background-color: ${(props) => (props.$isDarkMode ? "#333" : "#f4f4f4")};
  color: ${(props) => (props.$isDarkMode ? "#f4f4f4" : "#333")};
`;

function TiresLayout({ trucks }) {
  const [searchParams] = useSearchParams();
  const { isDarkMode } = useDarkMode();

  // Sorting
  const sortRaw = searchParams.get("sortBy") || "licensePlate-asc";
  const [field, direction] = sortRaw.split("-");

  const modifier = direction === "asc" ? 1 : -1;
  // const sortedTrucks = trucks.sort((a, b) => (a[field] - b[field]) * modifier);
  const sortedTrucks = trucks.sort((a, b) => {
    if (typeof a[field] === "string" && typeof b[field] === "string") {
      // Use localeCompare for strings
      return a[field].localeCompare(b[field]) * modifier;
    } else {
      // Use subtraction for numbers
      return (a[field] - b[field]) * modifier;
    }
  });

  return (
    <>
      <TrucksContainer $isDarkMode={isDarkMode}>
        {sortedTrucks.map((truck) => (
          <TruckCard
            truck={truck}
            key={truck.id}
            resourceName="tires"
            labelButton="Registrar nuevo neúmatico"
            form={
              <CreateTiresForm
                truckId={truck.id}
                licensePlate={truck.licensePlate}
              />
            }
            hideFormModal={true}
          />
        ))}
      </TrucksContainer>
    </>
  );
}

export default TiresLayout;
