import { useQuery } from "@tanstack/react-query";
import { getTrips } from "../../services/apiTrips";
import { useSearchParams } from "react-router-dom";

export function useTrips() {
  const [searchParams] = useSearchParams();

  // Filter
  const filterField = "tripType";
  const filterValue = searchParams.get("type");
  const filter =
    !filterValue || filterValue === "all"
      ? null
      : { field: filterField, value: filterValue };

  // SortBy
  const sortRaw = searchParams.get("sortBy") || "startDate-desc";
  const [field, direction] = sortRaw.split("-");
  const sortBy = { field, direction };

  const {
    isLoading,
    data: trips,
    error,
  } = useQuery({
    queryKey: ["trips", filter, sortBy],
    queryFn: () => getTrips({ filter, sortBy }),
  });

  return { isLoading, trips, error };
}
