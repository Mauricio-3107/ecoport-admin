import { useQuery } from "@tanstack/react-query";
import { getCompany } from "../../services/apiCompany";

export function useCompany() {
  const {
    isLoading,
    error,
    data: company,
  } = useQuery({
    queryKey: ["company"],
    queryFn: getCompany,
  });

  return { isLoading, error, company };
}
