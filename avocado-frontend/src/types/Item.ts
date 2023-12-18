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
  OVAL = "Oval",
  PEAR = "Pear",
  ROUND = "Round",
  PLUMP = "Plump",
  OBOVATE = "Obovate",
  LONG_PEAR = "Long pear",
}

export interface ItemSimple extends Base {
  name: string;
  image: string;
  sellPrice: number;
}

export interface ItemRequest {
  name: string;
  description: string;
  image: string;
  sellPrice: number;
  currentStock: number;
  shape: ItemShape;
  taste: string;
  hardiness: number;
}
