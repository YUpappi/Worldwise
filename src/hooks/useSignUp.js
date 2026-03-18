import { useMutation } from "@tanstack/react-query";
import { signUp as signupApi } from "../services/apiAuth";
import toast from "react-hot-toast";

function useSignUp() {
  const { mutate: signup, isPending } = useMutation({
    mutationFn: signupApi,
    onSuccess: () => {
      toast.success(
        "Sign up successful! Please check your email to confirm your account."
      );
    },
    onError: (error) => {
      toast.error(error.message || "Sign up failed");
    },
  });
  return { signup, isPending };
}

export default useSignUp;
