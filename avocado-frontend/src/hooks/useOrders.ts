import { useEffect, useState } from "react";
import { Order } from "../types/Order";
import OrderService from "../services/OrderService";
import { useAuthContext } from "../context/AuthContext";
import { useLocalStorage } from "./useLocalStorage";

export const useOrders = () => {
  const { user } = useAuthContext();
  const { getItemFromLS } = useLocalStorage();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      setLoading(true);

      const token = getItemFromLS("token") || "";

      if (user && user.role === "CLIENT") {
        const { id } = user;
        const newOrders = await OrderService.findAllByUser(id, token);
        setOrders(newOrders);
      } else {
        const newOrders = await OrderService.findAll(token);
        setOrders(newOrders);
      }
    } catch (error) {
      console.error("Error fetching orders:", error);
    } finally {
      setLoading(false);
    }
  };

  return {
    orders,
    loading,
  };
};
