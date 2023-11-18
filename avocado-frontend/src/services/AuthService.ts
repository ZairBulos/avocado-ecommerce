import { API_URL } from "../constants";
import { Login } from "../types/Login";
import { Register } from "../types/Register";
import { Token } from "../types/Token";

const login = async (user: Login): Promise<Token> => {
  // eslint-disable-next-line no-useless-catch
  try {
    const response = await fetch(`${API_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });

    if (!response.ok) {
      throw new Error("HTTP Status. " + response.status);
    }

    const data = (await response.json()) as Token;
    return data;
  } catch (error) {
    throw error;
  }
};

const register = async (user: Register): Promise<Token> => {
  // eslint-disable-next-line no-useless-catch
  try {
    const response = await fetch(`${API_URL}/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });

    if (!response.ok) {
      throw new Error("HTTP Status. " + response.status);
    }

    const data = (await response.json()) as Token;
    return data;
  } catch (error) {
    throw error;
  }
};

const logout = async (): Promise<void> => {
  // eslint-disable-next-line no-useless-catch
  try {
    await fetch(`${API_URL}/auth/logout`, {
      method: "POST",
    });
  } catch (error) {
    throw error;
  }
};

export default {
  login,
  logout,
  register,
};
