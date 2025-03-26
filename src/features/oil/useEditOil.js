import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { editOil as editOilApi } from "../../services/apiOil";

export function useEditOil() {
  const queryClient = useQueryClient();

  const { isLoading: isEditing, mutate: editOil } = useMutation({
    mutationFn: ({ editOil, id }) => editOilApi(editOil, id),
    onSuccess: () => {
      toast.success("Oil successfully edited");
      queryClient.invalidateQueries({
        queryKey: ["oil"],
      });
    },
    onError: (err) => toast.error(err.message),
  });

  return { isEditing, editOil };
}
