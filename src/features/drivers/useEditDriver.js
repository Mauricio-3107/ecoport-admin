import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { createEditDriver } from "../../services/apiDrivers";

export function useEditDriver() {
  const queryClient = useQueryClient();
  const { isLoading: isEditing, mutate: editDriver } = useMutation({
    mutationFn: ({ newDriverData, id }) => createEditDriver(newDriverData, id),
    onSuccess: () => {
      toast.success("Conductor agregado exitosamente");
      queryClient.invalidateQueries({
        queryKey: ["drivers"],
      });
    },
    onError: (err) => toast.error(err.message),
  });
  return { isEditing, editDriver };
}
