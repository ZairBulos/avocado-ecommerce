import { useState, useEffect } from "react";
import { Item } from "../types/Item";
import itemService from "../services/ItemService";

export const useItems = () => {
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      setLoading(true);

      const newItems = await itemService.findAllUnlocked();
      setItems(newItems);
    } catch (error) {
      console.error('Error fetching items:', error);
    } finally {
      setLoading(false);
    }
  };

  return { 
    items,
    loading 
  };
};
