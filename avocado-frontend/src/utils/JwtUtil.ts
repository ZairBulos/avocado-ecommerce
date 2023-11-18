import { JwtPayload, jwtDecode } from "jwt-decode";
import { UserRole } from "../types/UserRole";

type CustomJwtPayload = JwtPayload & {
  role: UserRole,
  id: number
};

export const decodeToken = (token: string) => {
  // eslint-disable-next-line no-useless-catch
  try {
    const decodedToken = jwtDecode<CustomJwtPayload>(token);
    return decodedToken;
  } catch (error) {
    throw error;
  }
};
