import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { createEditMaintenance } from "../../services/apiMaintenance";

export function useEditMaintenance() {
  const queryClient = useQueryClient();

  const { isLoading: isEditing, mutate: editMaintenance } = useMutation({
    mutationFn: ({ newMaintenanceData, id }) =>
      createEditMaintenance(newMaintenanceData, id),
    onSuccess: () => {
      toast.success("Maintenance  successfully edited");
      queryClient.invalidateQueries({
        active: true,
      });
    },
    onError: (err) => toast.error(err.message),
  });

  return { isEditing, editMaintenance };
}
