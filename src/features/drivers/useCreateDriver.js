import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { createEditDriver } from "../../services/apiDrivers";

export function useCreateDriver() {
  const queryClient = useQueryClient();
  const { isLoading: isCreating, mutate: createDriver } = useMutation({
    mutationFn: (newDriver) => createEditDriver(newDriver),
    onSuccess: () => {
      toast.success("Conductor agregado exitosamente");
      queryClient.invalidateQueries({
        queryKey: ["drivers"],
      });
    },
    onError: (err) => toast.error(err.message),
  });
  return { isCreating, createDriver };
}
