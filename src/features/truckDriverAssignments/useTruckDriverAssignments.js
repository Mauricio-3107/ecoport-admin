import { useQuery } from "@tanstack/react-query";
import { getTruckDriverAssignments } from "../../services/apiTruckDriverAssignments";

export function useTruckDriverAssignments() {
  const {
    isLoading,
    data: truckDriverAssignments,
    error,
  } = useQuery({
    queryKey: ["truckDriverAssignments"],
    queryFn: getTruckDriverAssignments,
  });

  return { isLoading, truckDriverAssignments };
}
