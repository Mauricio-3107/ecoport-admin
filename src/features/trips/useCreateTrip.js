import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { createEditTrip } from "../../services/apiTrips";

export function useCreateTrip() {
  const queryClient = useQueryClient();
  const { isLoading: isCreating, mutate: createTrip } = useMutation({
    mutationFn: (newTrip) => createEditTrip(newTrip),
    onSuccess: () => {
      toast.success("Viaje agregado exitosamente");
      queryClient.invalidateQueries({
        queryKey: ["trips"],
      });
    },
    onError: (err) => toast.error(err.message),
  });
  return { isCreating, createTrip };
}
