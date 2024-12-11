import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createTruckDriverAssignments } from "../../services/apiTruckDriverAssignments";
import toast from "react-hot-toast";

export function useCreateTruckDriverAssignments() {
  const queryClient = useQueryClient();
  const { isLoading: isCreating, mutate: createATruckDriverAssignments } =
    useMutation({
      mutationFn: (newTda) => createTruckDriverAssignments(newTda),
      onSuccess: () => {
        toast.success("Asignación agregado exitosamente");
        queryClient.invalidateQueries({
          queryKey: ["truckDriverAssignments"],
        });
      },
      onError: (err) => toast.error(err.message),
    });
    
  return { isCreating, createATruckDriverAssignments };
}
