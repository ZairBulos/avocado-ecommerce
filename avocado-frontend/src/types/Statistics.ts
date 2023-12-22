import { Item } from "./Item";

export interface ItemRanking {
  item: Item;
  sales: number;
}

export interface UserRanking {
  user: string;
  purchases: number;
}
