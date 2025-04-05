import { useQuery } from "@tanstack/react-query";
import { getTripsAfterDate } from "../../services/apiTrips";
import { useSearchParams } from "react-router-dom";
import { getToday } from "../../utils/helpers";
import { subDays } from "date-fns";

export function useRecentTrips() {
  const [searchParams] = useSearchParams();

  // Filter
  const queryDateRaw = searchParams.get("last") || "Today";

  let queryDate;
  if (queryDateRaw === "Today") queryDate = getToday();
  if (queryDateRaw === "7" || queryDateRaw === "30")
    queryDate = subDays(new Date(), Number(queryDateRaw)).toISOString();
  const dateKey = queryDateRaw === "Today" ? "Today" : `last-${queryDateRaw}`;

  // Query
  const {
    isLoading,
    data: { data: trips, count } = {},
    error,
  } = useQuery({
    queryKey: ["trips", dateKey],
    queryFn: () => getTripsAfterDate(queryDate),
  });

  return { isLoading, trips, error, count };
}
