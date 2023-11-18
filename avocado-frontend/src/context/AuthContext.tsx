import {
  createContext,
  useContext,
  ReactNode,
  useState,
  useEffect,
  useCallback,
  useMemo,
} from "react";
import { User } from "../types/User";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { decodeToken } from "../utils/JwtUtil";

interface AuthContextProps {
  user: User | null;
  login: (token: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

// eslint-disable-next-line react-refresh/only-export-components
export const useAuthContext = (): AuthContextProps => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
};

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const { getItemFromLS, setItemToLS, removeItemFromLS } = useLocalStorage();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const token = getItemFromLS("token");

    if (token) {
      const decodedToken = decodeToken(token);

      if (decodedToken) {
        setUser({
          id: decodedToken.id,
          email: decodedToken.sub ?? "",
          role: decodedToken.role,
        });
      }
    }
  }, []);

  const login = useCallback((token: string) => {
    try {
      const decodedToken = decodeToken(token);

      if (decodedToken) {
        setUser({
          id: decodedToken.id,
          email: decodedToken.sub ?? "",
          role: decodedToken.role,
        });
        setItemToLS("token", token);
      }
    } catch (error) {
      console.error("Error decoding token:", error);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Función para manejar el cierre de sesión
  const logout = useCallback(() => {
    setUser(null);
    removeItemFromLS("token");

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const value = useMemo(() => ({ user, login, logout }), [user, login, logout]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
