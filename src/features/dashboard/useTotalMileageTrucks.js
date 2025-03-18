import { useQuery } from "@tanstack/react-query";
import { getTotalMileageTrucks } from "../../services/apiTotalMileageTrucks";

export function useTotalMileageTrucks() {
  const {
    isLoading,
    error,
    data: totalMileageTrucks,
  } = useQuery({
    queryKey: ["totalMileageTrucks"],
    queryFn: getTotalMileageTrucks,
  });

  return { isLoading, error, totalMileageTrucks };
}
