import { useState } from "react";
import { Item } from "../types/Item";
import ItemService from "../services/ItemService";

export const useItem = () => {
  const [item, setItem] = useState<Item | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchItem = async (id: number) => {
    try {
      setLoading(true);

      const newItem = await ItemService.findById(id);
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
