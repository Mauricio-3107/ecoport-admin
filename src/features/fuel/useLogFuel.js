import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { logFuel as logFuelApi } from "../../services/apiFuel";

export function useLogFuel() {
  const queryClient = useQueryClient();
  const { isLoading: isLoggingFuel, mutate: logFuel } = useMutation({
    mutationFn: ({ newLogFuel, id, licensePlate }) =>
      logFuelApi(newLogFuel, id, licensePlate),
    onSuccess: () => {
      toast.success("Registro de diésel registrado exitosamente");
      queryClient.invalidateQueries({
        queryKey: ["fuel"],
      });
    },
    onError: (err) => toast.error(err.message),
  });
  return { isLoggingFuel, logFuel };
}
