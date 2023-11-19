import { Base } from "./Base";
import { ItemAttributes } from "./ItemAttributes";

export interface Item extends Base {
  name: string;
  description: string;
  blocked: boolean;
  image: string;
  sellPrice: number;
  currentStock: number;
  attributes: ItemAttributes;
}
