import { Order } from "../../types/Order";
import OrderItem from "./OrderItem";

function OrderList({ orders }: { orders: Order[] }) {
  return (
    <table className="w-full text-left">
      <thead>
        <tr>
          <th scope="col" className="px-3">
            Order no.
          </th>
          <th scope="col" className="px-3">
            Order date
          </th>
          <th scope="col" className="px-3">
            Total
          </th>
          <th scope="col" className="px-3"></th>
        </tr>
      </thead>
      <tbody>
        {orders.map((order) => (
          <OrderItem key={order.id} order={order} />
        ))}
      </tbody>
    </table>
  );
}

export default OrderList;
