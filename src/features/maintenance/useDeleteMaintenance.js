import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteMaintenance as deleteMaintenanceApi } from "../../services/apiMaintenance";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";

export function useDeleteMaintenance() {
  const { truckId } = useParams();
  const queryClient = useQueryClient();

  const { mutate: deleteMaintenance, isLoading: isDeleting } = useMutation({
    mutationFn: (id) => deleteMaintenanceApi(id),
    onSuccess: () => {
      toast.success("Maintenance successfully deleted");
      queryClient.invalidateQueries({
        queryKey: ["maintenance", truckId],
      });
    },
    onError: (err) => toast.error(err.message),
  });
  return { isDeleting, deleteMaintenance };
}
