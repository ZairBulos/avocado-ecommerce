import { JwtPayload, jwtDecode } from "jwt-decode";

export const decodeToken = (token: string) => {
  // eslint-disable-next-line no-useless-catch
  try {
    const decodedToken = jwtDecode<JwtPayload>(token);
    return decodedToken;
  } catch (error) {
    throw error;
  }
};
