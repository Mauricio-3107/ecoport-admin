import { useQuery } from "@tanstack/react-query";
import { getDrivers } from "../../services/apiDrivers";

export function useDrivers() {
  const {
    isLoading,
    data: drivers,
    error,
  } = useQuery({
    queryKey: ["drivers"],
    queryFn: getDrivers,
  });

  return { isLoading, drivers };
}
