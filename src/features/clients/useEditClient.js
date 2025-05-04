import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { createEditClient } from "../../services/apiClients";

export function useEditClient() {
  const queryClient = useQueryClient();

  const { isLoading: isEditing, mutate: editClient } = useMutation({
    mutationFn: ({ newClientData, id }) => createEditClient(newClientData, id),
    onSuccess: () => {
      toast.success("Cliente editado exitosamente");
      queryClient.invalidateQueries({
        queryKey: ["clients"],
      });
    },
    onError: (err) => toast.error(err.message),
  });

  return { isEditing, editClient };
}
