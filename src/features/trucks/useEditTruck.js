import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createEditTruck } from "../../services/apiTrucks";
import toast from "react-hot-toast";

export function useEditTruck() {
  const queryClient = useQueryClient();
  const { isLoading: isEditing, mutate: editTruck } = useMutation({
    mutationFn: ({ newTruckData, id }) => createEditTruck(newTruckData, id),
    onSuccess: () => {
      toast.success("Camión editado exitosamente");
      queryClient.invalidateQueries({
        queryKey: ["trucks"],
      });
    },
    onError: (err) => toast.error(err.message),
  });

  return { isEditing, editTruck };
}
