import { useQuery } from "@tanstack/react-query";
import { getTrucks } from "../../services/apiTrucks";

export function useTrucks() {
  const {
    isLoading,
    data: trucks,
    error,
  } = useQuery({
    queryKey: ["trucks"],
    queryFn: getTrucks,
  });

  return { isLoading, trucks };
}
