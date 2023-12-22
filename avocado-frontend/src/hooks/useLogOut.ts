import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";
import AuthService from "../services/AuthService";
import { useCartContext } from "../context/CartContext";

export const useLogOut = () => {
  const { logout } = useAuthContext();
  const { clearCart } = useCartContext();
  const navigate = useNavigate();

  const handleLogOut = async () => {
    try {
      await AuthService.logout();
      logout();

      clearCart();

      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return { handleLogOut };
};
