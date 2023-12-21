import { Base } from "./Base";

export interface Item extends Base {
  name: string;
  blocked: boolean;
  description: string;
  image: string;
  sellPrice: number;
  currentStock: number;
  attributes: ItemAttributes;
}

export interface ItemAttributes extends Base {
  shape: ItemShape;
  taste: string;
  hardiness: number;
}

export enum ItemShape {
  OVAL = "OVAL",
  PEAR = "PEAR",
  ROUND = "ROUND",
  PLUMP = "PLUMP",
  OBOVATE = "OBOVATE",
  LONG_PEAR = "LONG_PEAR",
}

export interface ItemSimple extends Base {
  name: string;
  image: string;
  sellPrice: number;
}

export interface ItemRequest {
  id?: number;
  name: string;
  description: string;
  image: string;
  sellPrice: number;
  currentStock: number;
  shape: ItemShape;
  taste: string;
  hardiness: number;
}
