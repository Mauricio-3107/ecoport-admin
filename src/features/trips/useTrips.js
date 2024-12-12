import { useQuery } from "@tanstack/react-query";
import { getTrips } from "../../services/apiTrips";

export function useTrips() {
  const {
    isLoading,
    data: trips,
    error,
  } = useQuery({
    queryKey: ["trips"],
    queryFn: getTrips,
  });

  return { isLoading, trips };
}
