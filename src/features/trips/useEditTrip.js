import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { createEditTrip } from "../../services/apiTrips";

export function useEditTrip() {
  const queryClient = useQueryClient();

  const { isLoading: isEditing, mutate: editTrip } = useMutation({
    mutationFn: ({ newTripData, id }) => createEditTrip(newTripData, id),
    onSuccess: () => {
      toast.success("Viaje editado exitosamente");
      queryClient.invalidateQueries({
        queryKey: ["trips"],
      });
    },
    onError: (err) => toast.error(err.message),
  });

  return { isEditing, editTrip };
}
