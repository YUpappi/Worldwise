import { useNavigate } from "react-router-dom";
import { logIn as loginApi } from "../services/apiAuth";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";

function useLogin() {
  const navigate = useNavigate();
  const { mutate: login, isPending } = useMutation({
    mutationFn: ({ email, password }) => loginApi({ email, password }),
    onSuccess: () => {
      toast.success("Logged in");
      navigate("/App", { replace: true });
    },
    onError: (error) => {
      toast.error(error.message || "Login failed");
    },
  });
  return { login, isPending };
}

export default useLogin;
