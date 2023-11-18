import { API_URL } from "../constants";
import { Login } from "../types/Login";
import { Token } from "../types/Token";
import { User } from "../types/User";

const login = async (user: Login): Promise<Token> => {
  // eslint-disable-next-line no-useless-catch
  try {
    const response = await fetch(`${API_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(user)
    });

    if (!response.ok) {
      throw new Error("HTTP Status. " + response.status);
    }

    const data = await response.json() as Token;
    return data;
  } catch (error) {
    throw error;
  }
};

const register = async (user: User): Promise<Token> => {
  // eslint-disable-next-line no-useless-catch
  try {
    const response = await fetch(`${API_URL}/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(user)
    });

    if (!response.ok) {
      throw new Error("HTTP Status. " + response.status);
    }

    const data = await response.json() as Token;
    return data;
  } catch (error) {
    throw error;
  }
};

export default {
  login,
  register
}
