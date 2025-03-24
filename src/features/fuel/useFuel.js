import { useQuery } from "@tanstack/react-query";
import { getFuelConsumption } from "../../services/apiFuel";

export function useFuel() {
  const { isLoading, data: fuelConsumptionTrucks } = useQuery({
    queryKey: ["fuel"],
    queryFn: getFuelConsumption,
  });

  return { isLoading, fuelConsumptionTrucks };
}
