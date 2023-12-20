import { useState, useEffect } from "react";

import { Item } from "../types/Item";
import { useBoolean } from "./useBoolean";
import { useLocalStorage } from "./useLocalStorage";
import ItemService from "../services/ItemService";

export const useProducts = () => {
  const { getItemFromLS } = useLocalStorage();
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const { isTrue: reload, onToggle: onReload } = useBoolean();

  useEffect(() => {
    fetchItems();
  }, [reload]);

  const fetchItems = async () => {
    try {
      setLoading(true);

      const token = getItemFromLS("token") || ""; 

      const newItems = await ItemService.findAll(token);
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
    onReload
  };
};
