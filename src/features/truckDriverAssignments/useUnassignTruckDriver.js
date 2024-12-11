import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { unassignTruckDriver } from "../../services/apiTruckDriverAssignments";

export function useUnassignTruckDriver() {
  const queryClient = useQueryClient();

  const { isLoading: isUnassigning, mutate: unassignTruck } = useMutation({
    mutationFn: ({ assignmentEndDate, id }) => {
      return unassignTruckDriver(assignmentEndDate, id);
    },
    onSuccess: () => {
      toast.success("Unassignment successfully completed");
      queryClient.invalidateQueries({
        queryKey: ["truckDriverAssignments"],
      });
    },
    onError: (err) => toast.error(err.message),
  });

  return { isUnassigning, unassignTruck };
}
