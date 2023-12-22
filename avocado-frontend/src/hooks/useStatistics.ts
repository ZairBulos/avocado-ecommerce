import { useEffect, useState } from "react";

import { ItemRanking, UserRanking } from "../types/Statistics";
import { useLocalStorage } from "./useLocalStorage";
import UserService from "../services/UserService";
import ItemService from "../services/ItemService";

export const useStatistics = () => {
  const { getItemFromLS } = useLocalStorage();
  const [loading, setLoading] = useState<boolean>(false);
  const [registeredUsers, setRegisteredUsers] = useState<number>(0);
  const [usersRanking, setUsersRanking] = useState<UserRanking[]>([]);
  const [itemsRanking, setItemsRanking] = useState<ItemRanking[]>([]);

  useEffect(() => {
    fetchStatistics();
  }, []);

  const fetchStatistics = async () => {
    try {
      setLoading(true);

      const token = getItemFromLS("token") || "";

      const newUsersRanking = await UserService.findTopUsers(token);
      setUsersRanking(newUsersRanking);

      const newRegisteredUsers = await UserService.findUsersRegisteredInMonth(token);
      setRegisteredUsers(newRegisteredUsers);

      const newItemsRanking = await ItemService.findTopItems(token);
      setItemsRanking(newItemsRanking);
    } catch (error) {
      console.log("Error fetching statistics:", error);
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    itemsRanking,
    usersRanking,
    registeredUsers,
  };
};
