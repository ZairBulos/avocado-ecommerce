import { useAuthContext } from "../context/AuthContext";
import AuthService from "../services/AuthService";

export const useLogOut = () => {
  const { logout } = useAuthContext();

  const handleLogOut = async () => {
    try {
      await AuthService.logout();
      logout();
    } catch (error) {
      console.log(error);
    }
  };

  return { handleLogOut };
};
