import { Order } from "../../types/Order";
import { useBoolean } from "../../hooks/useBoolean";
import OrderDetailModal from "../Modal/OrderDetailModal";
import ListDetailsIcon from "../../assets/list-details";

function OrderRow({ order }: { order: Order }) {
  const { isTrue: isOpen, onToggle: toggleOpen } = useBoolean();

  return (
    <>
      <tr>
        <td scope="row" className="px-6 py-3">
          {order.id}
        </td>
        <td scope="row" className="px-6 py-3">
          {order.user}
        </td>
        <td scope="row" className="px-6 py-3">
          {order.orderDate}
        </td>
        <td scope="row" className="px-6 py-3">
          {order.total}
        </td>
        <td scope="row" className="px-6 py-3">
          <button
            aria-label="order-detail"
            onClick={() => toggleOpen()}
          >
            <ListDetailsIcon width="18" height="18" />
          </button>
        </td>
      </tr>

      <OrderDetailModal
        isOpen={isOpen}
        title={`Order Detail no. ${order.id}`}
        order={order}
        onClose={toggleOpen}
      />
    </>
  );
}

export default OrderRow;
