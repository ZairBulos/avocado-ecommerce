import { Navigate } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";
import { UserRole } from "../types/User";

function ProtectedRoute({
  role,
  children,
}: {
  role: UserRole;
  children: React.ReactNode;
}) {
  const { user } = useAuthContext();

  if (!user || user.role !== role) {
    return <Navigate to="/unauthorized" />
  }

  return <>{children}</>;
}

export default ProtectedRoute;
