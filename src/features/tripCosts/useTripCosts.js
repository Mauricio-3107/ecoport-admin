import { useQuery } from "@tanstack/react-query";
import { getTripCosts } from "../../services/apiTripCosts";

export function useTripCosts() {
  const { isLoading, data: tripCosts } = useQuery({
    queryKey: ["tripCosts"],
    queryFn: getTripCosts,
  });
  return { isLoading, tripCosts };
}
