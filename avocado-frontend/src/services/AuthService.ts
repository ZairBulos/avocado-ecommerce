import { API_URL } from "../constants";
import { Auth } from "../types/Auth";
import { Token } from "../types/Token";

const login = async (user: Auth): Promise<Token> => {
  // eslint-disable-next-line no-useless-catch
  try {
    const response = await fetch(`${API_URL}/auth/login`, {
      method: "POST",
      body: JSON.stringify(user),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("HTTP Status: " + response.status);
    }

    const data = (await response.json()) as Token;
    return data;
  } catch (error) {
    throw error;
  }
};

const register = async (user: Auth): Promise<Token> => {
  // eslint-disable-next-line no-useless-catch
  try {
    const response = await fetch(`${API_URL}/auth/register`, {
      method: "POST",
      body: JSON.stringify(user),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("HTTP Status: " + response.status);
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
