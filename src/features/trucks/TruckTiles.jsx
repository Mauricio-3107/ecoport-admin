import styled from "styled-components";
import { useTrucks } from "./useTrucks";
import Spinner from "../../ui/Spinner";
import Empty from "../../ui/Empty";
import TruckTile from "./TruckTile";
import Menus from "../../ui/Menus";
import { useSearchParams } from "react-router-dom";

const TilesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(28rem, 1fr));
  gap: 1.6rem;
`;

export default function TruckTiles() {
  const { isLoading, trucks } = useTrucks();
  const [searchParams] = useSearchParams();

  if (isLoading) return <Spinner />;
  if (!trucks.length) return <Empty resourceName="camión" />;

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
    <Menus>
      <TilesGrid>
        {sortedTrucks.map((t) => (
          <TruckTile key={t.id} truck={t} />
        ))}
      </TilesGrid>
    </Menus>
  );
}
