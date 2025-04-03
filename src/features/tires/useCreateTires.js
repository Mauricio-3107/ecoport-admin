import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { createEditTires } from "../../services/apiTires";

export function useCreateTires() {
  const queryClient = useQueryClient();
  const { isLoading: isCreating, mutate: createTire } = useMutation({
    mutationFn: (newTire) => createEditTires(newTire),
    onSuccess: () => {
      toast.success("Gomas agregado exitosamente");
      queryClient.invalidateQueries({
        queryKey: ["tires"],
      });
    },
    onError: (err) => toast.error(err.message),
  });
  return { isCreating, createTire };
}
