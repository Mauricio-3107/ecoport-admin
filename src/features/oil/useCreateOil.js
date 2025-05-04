import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { createEditOil as createOilApi } from "../../services/apiOil";

export function useCreateOil() {
  const queryClient = useQueryClient();

  const { isLoading: isCreating, mutate: createOil } = useMutation({
    mutationFn: (newOil) => createOilApi(newOil),
    onSuccess: () => {
      toast.success("Cambio de aceite registrado exitosamente");
      queryClient.invalidateQueries({
        queryKey: ["oil"],
      });
    },
    onError: (err) => toast.error(err.message),
  });

  return { isCreating, createOil };
}
