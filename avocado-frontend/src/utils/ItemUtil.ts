import { Item, ItemRequest, ItemShape } from "../types/Item";

export const itemToItemRequest = (item: Item): ItemRequest => {
  return {
    id: item.id,
    name: item.name,
    description: item.description,
    image: item.image,
    sellPrice: item.sellPrice,
    currentStock: item.currentStock,
    shape: item.attributes.shape as ItemShape,
    taste: item.attributes.taste,
    hardiness: item.attributes.hardiness,
  };
};
