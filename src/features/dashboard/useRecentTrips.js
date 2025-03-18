import { useQuery } from "@tanstack/react-query";
import { subDays } from "date-fns";
import { useSearchParams } from "react-router-dom";
import { getTripsAfterDate } from "../../services/apiTrips";

export function useRecentTrips() {
  const [searchParams] = useSearchParams();

  const numDays = !searchParams.get("last")
    ? 7
    : Number(searchParams.get("last"));

  const queryDate = subDays(new Date(), numDays).toISOString();

  const { isLoading, data: { data: trips, count } = {} } = useQuery({
    queryFn: () => getTripsAfterDate(queryDate),
    queryKey: ["trips", `last-${numDays}`],
  });

  return { isLoading, trips, numDays, count };
}
