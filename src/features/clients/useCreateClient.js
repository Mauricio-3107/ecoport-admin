import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { createEditClient } from "../../services/apiClients";

export function useCreateClient() {
  const queryClient = useQueryClient();

  const { isLoading: isCreating, mutate: createClient } = useMutation({
    mutationFn: (newCabin) => createEditClient(newCabin),
    onSuccess: () => {
      toast.success("Nuevo cliente creado exitosamente");
      queryClient.invalidateQueries({
        queryKey: ["clients"],
      });
    },
    onError: (err) => toast.error(err.message),
  });

  return { isCreating, createClient };
}
