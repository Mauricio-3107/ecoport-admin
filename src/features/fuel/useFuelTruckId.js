import { useQuery } from "@tanstack/react-query";
import { useParams, useSearchParams } from "react-router-dom";
import { getFuelTruckId } from "../../services/apiFuel";

export function useFuelTruckId() {
  const { truckId } = useParams();
  const [searchParams] = useSearchParams();

  const filterValueLastFuels = searchParams.get("last")
    ? Number(searchParams.get("last"))
    : 7;

  const { isLoading, data, error } = useQuery({
    queryKey: ["fuel", truckId],
    queryFn: () => getFuelTruckId(truckId),
    retry: false,
  });
  console.log(data);
  console.log(error);
  // Case 3: Truck ID does not exist
  if (error) return { isLoading, fuelTruckId: null, error };

  // Case 2: Truck exists but has no fuel records yet
  const filteredFuelTruckId =
    data?.length > 0 ? data.slice(0, filterValueLastFuels) : [];

  return { isLoading, fuelTruckId: filteredFuelTruckId, error: null };
}
