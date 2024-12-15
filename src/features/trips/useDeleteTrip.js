import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteTrip as deleteTripApi } from "../../services/apiTrips";
import toast from "react-hot-toast";

export function useDeleteTrip() {
  const queryClient = useQueryClient();

  const { isLoading: isDeleting, mutate: deleteTrip } = useMutation({
    mutationFn: (id) => deleteTripApi(id),
    onSuccess: () => {
      toast.success("Trip successfully deleted");
      queryClient.invalidateQueries({
        queryKey: ["trips"],
      });
    },
    onError: (err) => toast.error(err.message),
  });

  return { isDeleting, deleteTrip };
}
