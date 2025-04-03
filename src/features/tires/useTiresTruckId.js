import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { getTiresTruckId } from "../../services/apiTires";

export function useTiresTruckId() {
  const { truckId } = useParams();

  const {
    isLoading,
    data: tires,
    error,
  } = useQuery({
    queryKey: ["tires", truckId],
    queryFn: () => getTiresTruckId(truckId),
    retry: false,
  });

  return { isLoading, tires, error };
}
