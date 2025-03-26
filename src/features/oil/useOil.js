import { useQuery } from "@tanstack/react-query";
import { getOil } from "../../services/apiOil";

export function useOil() {
  const { isLoading, data: oil } = useQuery({
    queryKey: ["oil"],
    queryFn: getOil,
  });
  return { isLoading, oil };
}
