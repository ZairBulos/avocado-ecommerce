import { API_URL } from "../constants";
import { Order, OrderRequest } from "../types/Order";

const findAll = async (token: string): Promise<Order[]> => {
  // eslint-disable-next-line no-useless-catch
  try {
    const response = await fetch(`${API_URL}/orders`, {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error("HTTP Status: " + response.status);
    }

    const data = (await response.json()) as Order[];
    return data;
  } catch (error) {
    throw error;
  }
};

const findAllByUser = async (userId: number, token: string): Promise<Order[]> => {
  // eslint-disable-next-line no-useless-catch
  try {
    const response = await fetch(`${API_URL}/orders/${userId}/purchase-history`, {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error("HTTP Status: " + response.status);
    }

    const data = (await response.json()) as Order[];
    return data;
  } catch (error) {
    throw error;
  }
};

const findById = async (id: number, token: string): Promise<Order> => {
  // eslint-disable-next-line no-useless-catch
  try {
    const response = await fetch(`${API_URL}/orders/${id}`, {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error("HTTP Status: " + response.status);
    }

    const data = (await response.json()) as Order;
    return data;
  } catch (error) {
    throw error;
  }
};

const save = async (order: OrderRequest, token: string): Promise<Order> => {
  // eslint-disable-next-line no-useless-catch
  try {
    const response = await fetch(`${API_URL}/orders`, {
      method: "POST",
      body: JSON.stringify(order),
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
    });

    if (response.status !== 201) {
      throw new Error("HTTP Status: " + response.status);
    }

    const data = (await response.json()) as Order;
    return data;
  } catch (error) {
    throw error;
  }
};

const remove = async (id: number, token: string): Promise<void> => {
  // eslint-disable-next-line no-useless-catch
  try {
    const response = await fetch(`${API_URL}/orders/${id}`, {
      method: "DELETE",
      headers: {
        "Authorization": `Bearer ${token}`,
      },
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
  findAllByUser,
  findById,
  save,
  remove
};
