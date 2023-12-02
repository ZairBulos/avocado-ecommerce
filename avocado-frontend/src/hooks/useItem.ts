import { useState } from "react";
import { Item } from "../types/Item";
import baseService from "../services/BaseService";
import { Endpoint } from "../types/Endpoint.d.ts";

export const useItem = () => {
  const [item, setItem] = useState<Item | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchItem = async (id: number) => {
    try {
      setLoading(true);

      const newItem = await baseService.findById<Item>(Endpoint.ITEM, id);
      setItem(newItem);
    } catch (error) {
      console.error("Error fetching item:", error);
    } finally {
      setLoading(false);
    }
  };

  return {
    item,
    loading,
    fetchItem,
  };
};
