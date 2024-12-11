import { useQuery } from "@tanstack/react-query";
import { getBookings } from "../../services/apiBookings";
import { useSearchParams } from "react-router-dom";

export function useBookings() {
  const [searchParams] = useSearchParams();

  // Filter
  const filterField = "status";
  const filterValue = searchParams.get(filterField);
  const filter =
    !filterValue || filterValue === "all"
      ? null
      : { field: filterField, value: filterValue };
  // { field: "totalPrice", value: 5000, method: "gte" };

  // SortBy
  const sortRaw = searchParams.get("sortBy") || "startDate-desc";
  const [field, direction] = sortRaw.split("-");
  const sortBy = { field, direction };

  const {
    isLoading,
    data: bookings,
    error,
  } = useQuery({
    queryKey: ["bookings", filter, sortBy],
    queryFn: () => getBookings({ filter, sortBy }),
  });

  return { isLoading, error, bookings };
}
