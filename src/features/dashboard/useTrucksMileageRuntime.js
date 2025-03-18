import { useQuery } from "@tanstack/react-query";
import { getTrucksMileageRuntime } from "../../services/apiTrucksMileageRuntime";

export function useTrucksMileageRuntime() {
  const {
    isLoading,
    error,
    data: trucksMileageRuntime,
  } = useQuery({
    queryKey: ["trucksMileageRuntime"],
    queryFn: getTrucksMileageRuntime,
  });

  return { isLoading, error, trucksMileageRuntime };
}
