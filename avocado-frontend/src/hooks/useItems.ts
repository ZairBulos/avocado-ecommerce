import { useState, useEffect } from "react";
import { ItemSimple } from "../types/Item";
import ItemService from "../services/ItemService";

export const useItems = () => {
  const [items, setItems] = useState<ItemSimple[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      setLoading(true);

      const newItems = await ItemService.findAllUnlocked();
      setItems(newItems);
    } catch (error) {
      console.error("Error fetching items:", error);
    } finally {
      setLoading(false);
    }
  };

  return {
    items,
    loading,
  };
};
