import { useQuery } from "@tanstack/react-query";
import { getClients } from "../../services/apiClients";

export function useClients() {
  const {
    isLoading,
    data: clients,
    error,
  } = useQuery({
    queryKey: ["clients"],
    queryFn: getClients,
  });
  
  return { isLoading, clients };
}
