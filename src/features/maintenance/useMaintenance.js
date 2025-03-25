import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { getMaintenance } from "../../services/apiMaintenance";

export function useMaintenance() {
  const { truckId } = useParams();

  const {
    isLoading,
    data: maintenanceTruck,
    error,
  } = useQuery({
    queryKey: ["maintenance", truckId],
    queryFn: () => getMaintenance(truckId),
    retry: false,
  });

  return { isLoading, maintenanceTruck, error };
}
