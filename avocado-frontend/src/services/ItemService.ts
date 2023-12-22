import { API_URL } from "../constants";
import { Item, ItemRequest, ItemSimple } from "../types/Item";
import { ItemRanking } from "../types/Statistics";

const findAll = async (token: string): Promise<Item[]> => {
  // eslint-disable-next-line no-useless-catch
  try {
    const response = await fetch(`${API_URL}/items`, {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error("HTTP Status: " + response.status);
    }

    const data = (await response.json()) as Item[];
    return data;
  } catch (error) {
    throw error;
  }
};

const findAllUnlocked = async (): Promise<ItemSimple[]> => {
  // eslint-disable-next-line no-useless-catch
  try {
    const response = await fetch(`${API_URL}/items/unlocked`);

    if (!response.ok) {
      throw new Error("HTTP Status: " + response.status);
    }

    const data = (await response.json()) as ItemSimple[];
    return data;
  } catch (error) {
    throw error;
  }
};

const findTopItems = async (token: string): Promise<ItemRanking[]> => {
  // eslint-disable-next-line no-useless-catch
  try {
    const response = await fetch(`${API_URL}/items/ranking/top-items`, {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error("HTTP Status: " + response.status);
    }

    const data = (await response.json()) as ItemRanking[];
    return data;
  } catch (error) {
    throw error;
  }
};

const findById = async (id: number): Promise<Item> => {
  // eslint-disable-next-line no-useless-catch
  try {
    const response = await fetch(`${API_URL}/items/${id}`);

    if (!response.ok) {
      throw new Error("HTTP Status: " + response.status);
    }

    const data = (await response.json()) as Item;
    return data;
  } catch (error) {
    throw error;
  }
};

const save = async (item: ItemRequest, token: string): Promise<Item> => {
  // eslint-disable-next-line no-useless-catch
  try {
    const response = await fetch(`${API_URL}/items`, {
      method: "POST",
      body: JSON.stringify(item),
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      }
    });

    if (response.status !== 201) {
      throw new Error("HTTP Status: " + response.status);
    }

    const data = (await response.json()) as Item;
    return data;
  } catch (error) {
    throw error;
  }
};

const update = async (id: number, item: ItemRequest, token: string): Promise<Item> => {
  // eslint-disable-next-line no-useless-catch
  try {
    const response = await fetch(`${API_URL}/items/${id}`, {
      method: "PUT",
      body: JSON.stringify(item),
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      }
    });

    if (!response.ok) {
      throw new Error("HTTP Status: " + response.status);
    }

    const data = (await response.json()) as Item;
    return data;
  } catch (error) {
    throw error;
  }
};

const lockUnlock = async (id: number, token: string): Promise<Item> => {
  // eslint-disable-next-line no-useless-catch
  try {
    const response = await fetch(`${API_URL}/items/${id}`, {
      method: "PATCH",
      headers: {
        "Authorization": `Bearer ${token}`,
      }
    });

    if (!response.ok) {
      throw new Error("HTTP Status: " + response.status);
    }

    const data = (await response.json()) as Item;
    return data;
  } catch (error) {
    throw error;
  }
};

const remove = async (id: number, token: string): Promise<void> => {
  // eslint-disable-next-line no-useless-catch
  try {
    const response = await fetch(`${API_URL}/items/${id}`, {
      method: "DELETE",
      headers: {
        "Authorization": `Bearer ${token}`,
      }
    });

    if (response.status !== 204) {
      throw new Error("HTTP Status: " + response.status);
    }
  } catch (error) {
    throw error;
  }
};

export default {
  findAll,
  findAllUnlocked,
  findTopItems,
  findById,
  save,
  update,
  lockUnlock,
  remove
};
