import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { getFinanceMonth } from "../../services/apiFinance";

export function useFinanceMonth() {
  const { month } = useParams();

  const {
    isLoading,
    data: financeMonth,
    error,
  } = useQuery({
    queryKey: ["finance", month],
    queryFn: () => getFinanceMonth(month),
    retry: false,
  });

  return { isLoading, financeMonth, error };
}
