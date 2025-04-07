import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { editTripCosts } from "../../services/apiTripCosts";

export function useEditTripCost() {
  const queryClient = useQueryClient();
  const { isLoading: isEditing, mutate: editTripCost } = useMutation({
    mutationFn: ({ newTripCost, id }) => editTripCosts(newTripCost, id),
    onSuccess: () => {
      toast.success("Trip cost editado exitosamente");
      queryClient.invalidateQueries({
        queryKey: ["tripCosts"],
      });
    },
    onError: (err) => toast.error(err.message),
  });
  return { isEditing, editTripCost };
}
