import { useState } from "react";
import { ItemCart } from "../context/CartContext";
import {
  Order,
  OrderDetailRequest,
  OrderRequest,
} from "../types/Order";
import { User } from "../types/User";
import { useLocalStorage } from "./useLocalStorage";
import OrderService from "../services/OrderService";

export const useCreateOrder = () => {
  const { getItemFromLS } = useLocalStorage();
  const [order, setOrder] = useState<Order | null>(null);

  const createOrder = async (items: ItemCart[], user: User) => {
    // eslint-disable-next-line no-useless-catch
    try {
      const token = getItemFromLS("token") || "";
      const order = createOrderFromCart(items, user);

      const newOrder = await OrderService.save(order, token);
      setOrder(newOrder);
    } catch (error) {
      throw error;
    }
  };

  const createOrderFromCart = (items: ItemCart[], user: User) => {
    const orderDetails = items.map((i) => {
      const orderDetail: OrderDetailRequest = {
        itemId: i.item.id,
        quantity: i.quantity,
        unitPrice: i.item.sellPrice,
      };

      return orderDetail;
    });

    const order: OrderRequest = {
      userId: user.id,
      orderDetails: orderDetails,
    };

    return order;
  };

  return {
    order,
    createOrder,
  };
};
