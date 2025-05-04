import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteClient as deleteClientApi } from "../../services/apiClients";
import toast from "react-hot-toast";

export function useDeleteClient() {
  const queryClient = useQueryClient();

  const { isLoading: isDeleting, mutate: deleteClient } = useMutation({
    mutationFn: (id) => deleteClientApi(id),
    onSuccess: () => {
      toast.success("Cliente eliminado exitosamente");
      queryClient.invalidateQueries({
        queryKey: ["clients"],
      });
    },
    onError: (err) => toast.error(err.message),
  });

  return { isDeleting, deleteClient };
}
