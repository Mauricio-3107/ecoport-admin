import { useParams } from "react-router-dom";
import { getLicensePlate } from "../../services/apiMaintenance";
import { useQuery } from "@tanstack/react-query";

export function useLicensePlate() {
  const { truckId } = useParams();
  const { isLoading, data, error } = useQuery({
    queryKey: ["maintenance"],
    queryFn: () => getLicensePlate(truckId),
    retry: false,
  });

  return { isLoading, data, error };
}
