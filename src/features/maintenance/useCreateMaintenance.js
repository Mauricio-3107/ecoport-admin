import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { createEditMaintenance } from "../../services/apiMaintenance";

export function useCreateMaintenance() {
  const queryClient = useQueryClient();

  const { isLoading: isCreating, mutate: createMaintenance } = useMutation({
    mutationFn: (newMaintenance) => createEditMaintenance(newMaintenance),
    onSuccess: (data) => {
      const truckId = data.truckId;
      toast.success("Mantenimiento registrado exitosamente");
      queryClient.invalidateQueries({
        queryKey: ["maintenance", truckId],
      });
    },
    onError: (err) => toast.error(err.message),
  });

  return { isCreating, createMaintenance };
}
