import { useQuery } from "@tanstack/react-query";
import { getPickupMileageRuntime } from "../../services/apiPickupMileageRuntime";

export function usePickupMileageRuntime() {
  const {
    isLoading,
    error,
    data: pickupMileageRuntime,
  } = useQuery({
    queryKey: ["pickupMileageRuntime"],
    queryFn: getPickupMileageRuntime,
  });

  return { isLoading, error, pickupMileageRuntime };
}
