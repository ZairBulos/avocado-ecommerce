import { useState } from "react";

import { Item } from "../types/Item";
import ItemService from "../services/ItemService";
import { useLocalStorage } from "./useLocalStorage";

export const useLockUnlockItem = () => {
  const { getItemFromLS } = useLocalStorage();
  const [item, setItem] = useState<Item | null>(null);


  const onLockUnlock = async (id: number) => {
    // eslint-disable-next-line no-useless-catch
    try {
      const token = getItemFromLS("token") || "";

      const newItem = await ItemService.lockUnlock(id, token);
      setItem(newItem);
    } catch (error) {
      throw error;
    }
  };

  return {
    item,
    onLockUnlock
  }
};