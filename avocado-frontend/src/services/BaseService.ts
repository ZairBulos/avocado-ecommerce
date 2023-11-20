import { API_URL } from "../constants";
import { Base } from "../types/Base";
import { Page } from "../types/Page";
import { Endpoint } from "../types/Endpoint";

export const fetchWithAuthorization = async <T>(
  endpoint: string,
  method: string,
  token?: string,
  body?: T
): Promise<Response> => {
  // eslint-disable-next-line no-useless-catch
  try {
    const headers: HeadersInit = {};

    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }

    if (body) {
      headers["Content-Type"] = "application/json";
    }

    const response = await fetch(endpoint, {
      method,
      headers,
      body: body ? JSON.stringify(body) : undefined,
    });

    return response;
  } catch (error) {
    throw error;
  }
};

export const findAll = async <T extends Base>(
  endpoint: Endpoint,
  token?: string
): Promise<T[]> => {
  // eslint-disable-next-line no-useless-catch
  try {
    const response = await fetchWithAuthorization(
      `${API_URL}/${endpoint}`,
      "GET",
      token
    );

    if (!response.ok) {
      throw new Error("HTTP Status. " + response.status);
    }

    const data = (await response.json()) as T[];
    return data;
  } catch (error) {
    throw error;
  }
};

export const findAllPageable = async <T extends Base>(
  endpoint: Endpoint,
  page?: number,
  size?: number,
  token?: string
): Promise<Page<T>> => {
  // eslint-disable-next-line no-useless-catch
  try {
    const response = await fetchWithAuthorization(
      `${API_URL}/${endpoint}/paged?page=${page}&size=${size}`,
      "GET",
      token
    );

    if (!response.ok) {
      throw new Error("HTTP Status. " + response.status);
    }

    const data = (await response.json()) as Page<T>;
    return data;
  } catch (error) {
    throw error;
  }
};

export const findById = async <T extends Base>(
  endpoint: Endpoint,
  id: number,
  token?: string
): Promise<T> => {
  // eslint-disable-next-line no-useless-catch
  try {
    const response = await fetchWithAuthorization(
      `${API_URL}/${endpoint}/${id}`,
      "GET",
      token
    );

    if (!response.ok) {
      throw new Error("HTTP Status. " + response.status);
    }

    const data = (await response.json()) as T;
    return data;
  } catch (error) {
    throw error;
  }
};

export const save = async <T extends Base>(
  endpoint: Endpoint,
  entity: T,
  token?: string
): Promise<T> => {
  // eslint-disable-next-line no-useless-catch
  try {
    const response = await fetchWithAuthorization(
      `${API_URL}/${endpoint}`,
      "POST",
      token,
      entity
    );

    if (response.status !== 201) {
      throw new Error("HTTP Status. " + response.status);
    }

    const data = (await response.json()) as T;
    return data;
  } catch (error) {
    throw error;
  }
};

export const update = async <T extends Base>(
  endpoint: Endpoint,
  id: number,
  entity: T,
  token?: string
): Promise<T> => {
  // eslint-disable-next-line no-useless-catch
  try {
    const response = await fetchWithAuthorization(
      `${API_URL}/${endpoint}/${id}`,
      "PUT",
      token,
      entity
    );

    if (!response.ok) {
      throw new Error("HTTP Status. " + response.status);
    }

    const data = (await response.json()) as T;
    return data;
  } catch (error) {
    throw error;
  }
};

export const remove = async (
  endpoint: Endpoint,
  id: number,
  token?: string
): Promise<void> => {
  // eslint-disable-next-line no-useless-catch
  try {
    const response = await fetchWithAuthorization(
      `${API_URL}/${endpoint}/${id}`,
      "DELETE",
      token
    );

    if (response.status !== 204) {
      throw new Error("HTTP Status. " + response.status);
    }
  } catch (error) {
    throw error;
  }
};

export default {
  findAll,
  findAllPageable,
  findById,
  save,
  update,
  remove,
};
