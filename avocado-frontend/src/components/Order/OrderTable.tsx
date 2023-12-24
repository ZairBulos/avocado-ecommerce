import { Order } from "../../types/Order";
import OrderRow from "./OrderRow";

function OrderTable({ orders }: { orders: Order[] }) {
  return (
    <div className="overflow-y-auto max-h-[500px]">
      <table className="w-full text-left bg-white">
        <thead className="bg-black text-white text-xs uppercase">
          <tr>
            <th scope="col" className="px-6 py-3">
              Order no.
            </th>
            <th scope="col" className="px-6 py-3">
              User
            </th>
            <th scope="col" className="px-6 py-3">
              Order date
            </th>
            <th scope="col" className="px-6 py-3">
              Total
            </th>
            <th scope="col" className="px-6 py-3">Details</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <OrderRow key={order.id} order={order} />
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default OrderTable;
