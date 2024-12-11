import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteTruck as deleteTruckApi } from "../../services/apiTrucks";
import toast from "react-hot-toast";

export function useDeleteTruck() {
  const queryClient = useQueryClient();
  const { mutate: deleteTruck, isLoading: isDeleting } = useMutation({
    mutationFn: (id) => deleteTruckApi(id),
    onSuccess: () => {
      toast.success("Truck successfully deleted");
      queryClient.invalidateQueries({
        queryKey: ["trucks"],
      });
    },
    onError: (err) => toast.error(err.message),
  });
  return { isDeleting, deleteTruck };
}
