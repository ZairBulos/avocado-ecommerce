import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { Item } from "../types/Item";
import { useLocalStorage } from "../hooks/useLocalStorage";

export type ItemCart = {
  item: Item;
  quantity: number;
};

interface CartContextProps {
  items: ItemCart[];

  clearCart: () => void;
  addToCart: (item: Item, quantity: number) => void;
  removeFromCart: (id: number) => void;
  reduceQuantityFromCart: (id: number) => void;
  getCartTotal: () => number;
}

const CartContext = createContext<CartContextProps | undefined>(undefined);

export const useCartContext = (): CartContextProps => {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error("useCart must be used within an CartProvider");
  }

  return context;
};

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { getItemFromLS, setItemToLS } = useLocalStorage();
  const [items, setItems] = useState<ItemCart[]>(() => {
    const savedItems = getItemFromLS("cart");
    return savedItems ? JSON.parse(savedItems) : []
  });

  useEffect(() => {
    setItemToLS("cart", JSON.stringify(items));
  }, [items]);

  const clearCart = () => {
    setItems([]);
  };

  const addToCart = useCallback((item: Item, quantity: number) => {
    setItems((prevItems) => {
      const existingItem = prevItems.find((i) => i.item.id === item.id);

      if (existingItem) {
        const updatedItems = prevItems.map((i) => {
          if (i.item.id === item.id) {
            return {
              ...i,
              quantity: i.quantity + quantity,
            };
          }
          return i;
        });
        return updatedItems;
      } else {
        const newItemCart = {
          item,
          quantity,
        };
        return [...prevItems, newItemCart];
      }
    });
  }, []);

  const removeFromCart = useCallback((id: number) => {
    setItems((prevItems) => prevItems.filter((i) => i.item.id !== id));
  }, []);

  const reduceQuantityFromCart = useCallback((id: number) => {
    setItems((prevItems) => {
      const existingItem = prevItems.find((i) => i.item.id === id);

      if (existingItem && existingItem.quantity > 1) {
        const updatedItems = prevItems.map((i) => {
          if (i.item.id === id) {
            return {
              ...i,
              quantity: i.quantity - 1,
            };
          }
          return i;
        });

        return updatedItems;
      } else {
        return prevItems.filter((i) => i.item.id !== id);
      }

    });
  }, []);

  const getCartTotal = useCallback(() => {
    return Number(
      items
        .reduce((subtotal, i) => subtotal + i.item.sellPrice * i.quantity, 0)
        .toFixed(2)
    );
  }, [items]);

  const value = useMemo(
    () => ({
      items,
      clearCart,
      addToCart,
      removeFromCart,
      reduceQuantityFromCart,
      getCartTotal,
    }),
    [
      items,
      clearCart,
      addToCart,
      removeFromCart,
      reduceQuantityFromCart,
      getCartTotal,
    ]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
