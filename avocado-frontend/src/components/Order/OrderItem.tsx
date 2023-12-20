import { Order } from "../../types/Order";
import { useBoolean } from "../../hooks/useBoolean";
import ModalOrderDetail from "../Modal/ModalOrderDetail";

function OrderItem({ order }: { order: Order }) {
  const { isTrue: isOpen, onToggle } = useBoolean();

  return (
    <>
      <tr className="border-b">
        <td scope="row" className="px-3 py-3">{order.id}</td>
        <td scope="row" className="px-3 py-3">{order.orderDate}</td>
        <td scope="row" className="px-3 py-3">${order.total}</td>
        <td scope="row" className="px-3 py-3">
          <button 
            onClick={() => onToggle()}
            className="text-blue-500 hover:text-blue-600 hover:underline"
          >
            View details
          </button>
        </td>
      </tr>
      <ModalOrderDetail
        isOpen={isOpen}
        title="Order Details"
        order={order}
        onClose={onToggle}
      />
    </>
  );
}

export default OrderItem;
