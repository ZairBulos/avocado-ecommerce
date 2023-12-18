import { Base } from "./Base";
import { Item } from "./Item";

export interface Order extends Base {
  user: string;
  total: number;
  orderDate: string;
  orderDetails: OrderDetail[];
}

export interface OrderDetail extends Base {
  quantity: number;
  unitPrice: number;
  item: Item;
}

export interface OrderRequest {
  userId: number;
  orderDetails: OrderDetailRequest[];
}

export interface OrderDetailRequest {
  quantity: number;
  unitPrice: number;
  itemId: number;
}
