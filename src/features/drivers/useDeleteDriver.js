import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteDriver as deleteDriverApi } from "../../services/apiDrivers";
import toast from "react-hot-toast";

export function useDeleteDriver() {
  const queryClient = useQueryClient();
  const { mutate: deleteDriver, isLoading: isDeleting } = useMutation({
    mutationFn: (id) => deleteDriverApi(id),
    onSuccess: () => {
      toast.success("Driver successfully deleted");
      queryClient.invalidateQueries({
        queryKey: ["drivers"],
      });
    },
    onError: (err) => toast.error(err.message),
  });
  return { isDeleting, deleteDriver };
}
