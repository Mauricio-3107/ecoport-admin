import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { createEditTruck } from "../../services/apiTrucks";

export function useCreateTruck() {
  const queryClient = useQueryClient();
  const { isLoading: isCreating, mutate: createTruck } = useMutation({
    mutationFn: (newTruck) => createEditTruck(newTruck),
    onSuccess: () => {
      toast.success("Camión agregado exitosamente");
      queryClient.invalidateQueries({
        queryKey: ["trucks"],
      });
    },
    onError: (err) => toast.error(err.message),
  });
  return { isCreating, createTruck };
}
