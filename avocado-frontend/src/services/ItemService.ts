import { API_URL } from "../constants";
import { Endpoint } from "../types/Endpoint.d.ts";
import { Item } from "../types/Item";

export const findAllUnlocked = async (): Promise<Item[]> => {
  // eslint-disable-next-line no-useless-catch
  try {
    const response = await fetch(`${API_URL}/${Endpoint.ITEM}/unlocked`);

    if (!response.ok) {
      throw new Error("HTTP Status. " + response.status);
    }

    const data = await response.json() as Item[];
    return data;
  } catch (error) {
    throw error;
  }
};

export default {
  findAllUnlocked
};
