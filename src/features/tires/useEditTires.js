import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { createEditTires } from "../../services/apiTires";

export function useEditTires() {
  const queryClient = useQueryClient();
  const { isLoading: isEditing, mutate: editTires } = useMutation({
    mutationFn: ({ newTiresData, id }) => createEditTires(newTiresData, id),
    onSuccess: (data) => {
      const truckId = data.truckId;
      console.log(truckId);
      toast.success("Goma editada exitosamente");
      queryClient.invalidateQueries({ active: true });
    },
    onError: (err) => toast.error(err.message),
  });
  return { isEditing, editTires };
}
