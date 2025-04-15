import { useQuery } from "@tanstack/react-query";
import { getMonthImages } from "../../services/apiFinance";

export function useMonthImages() {
  const {
    isLoading,
    data: monthImages,
    error,
  } = useQuery({
    queryKey: ["month-images"],
    queryFn: () => getMonthImages(),
    retry: false,
  });

  return { isLoading, monthImages, error };
}
