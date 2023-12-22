import { API_URL } from "../constants";
import { UserRanking } from "../types/Statistics";

const findTopUsers = async (token: string): Promise<UserRanking[]> => {
  // eslint-disable-next-line no-useless-catch
  try {
    const response = await fetch(`${API_URL}/users/ranking/top-users`, {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error("HTTP Status: " + response.status);
    }

    const data = (await response.json()) as UserRanking[];
    return data;
  } catch (error) {
    throw error;
  }
};

const findUsersRegisteredInMonth = async (token: string): Promise<number> => {
  // eslint-disable-next-line no-useless-catch
  try {
    const response = await fetch(`${API_URL}/users/statistics/users-registered-in-month`, {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error("HTTP Status: " + response.status);
    }

    const data = (await response.json()) as number;
    return data;
  } catch (error) {
    throw error;
  }
};

const findUsersRegisteredBetweenDates = async (token: string, startDate: Date, endDate: Date): Promise<number> => {
  // eslint-disable-next-line no-useless-catch
  try {
    const response = await fetch(`${API_URL}/users/statistics/users-registered-between-dates?startDate=${startDate}&endDate=${endDate}`, {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error("HTTP Status: " + response.status);
    }

    const data = (await response.json()) as number;
    return data;
  } catch (error) {
    throw error;
  }
};

export default {
  findTopUsers,
  findUsersRegisteredInMonth,
  findUsersRegisteredBetweenDates
};
