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

  // Pagination
  const page = !searchParams.get("page") ? 1 : Number(searchParams.get("page"));

  // Query
  const {
    isLoading,
    data: { data: trips, count } = {},
    error,
  } = useQuery({
    queryKey: ["trips", filter, sortBy, page],
    queryFn: () => getTrips({ filter, sortBy, page }),
  });
  

  return { isLoading, trips, error, count };
}
