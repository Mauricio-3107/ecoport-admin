import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { updateCompany as updateCompanyApi } from "../../services/apiCompany";

export function useUpdateCompany() {
  const queryClient = useQueryClient();

  const { mutate: updateCompany, isLoading: isUpdating } = useMutation({
    mutationFn: (newData) => updateCompanyApi(newData),
    onSuccess: () => {
      toast.success("Company data successfully updated");
      queryClient.invalidateQueries({
        queryKey: ["company"],
      });
    },
    onError: (err) => toast.error(err.message),
  });

  return { isUpdating, updateCompany };
}
