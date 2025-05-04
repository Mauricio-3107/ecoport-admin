import { useMutation } from "@tanstack/react-query";
import { signup as signupApi } from "../../services/apiAuth";
import toast from "react-hot-toast";

export function useSignup() {
  const { mutate: signup, isLoading } = useMutation({
    mutationFn: signupApi,
    onSuccess: (user) => {
      console.log(user);
      toast.success(
        "Cuenta creada exitosamente. Por favor, verifica la nueva cuenta desde el correo del usuario"
      );
    },
  });

  return { signup, isLoading };
}
