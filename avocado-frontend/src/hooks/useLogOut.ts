import { useAuthContext } from "../context/AuthContext";
import authService from "../services/AuthService";

export const useLogOut = () => {
  const { logout } = useAuthContext();

  const handleLogOut = async () => {
    try {
      await authService.logout();
      logout();
    } catch (error) {
      console.log(error);
    }
  };

  return { handleLogOut };
};
