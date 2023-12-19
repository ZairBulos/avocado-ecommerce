import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
} from "@nextui-org/react";
import { Order } from "../../types/Order";

function ModalOrderDetail({
  isOpen,
  title,
  order,
  onClose,
}: {
  isOpen: boolean;
  title: string;
  order: Order;
  onClose: () => void;
}) {
  return (
    <Modal backdrop="opaque" placement="top-center" isOpen={isOpen} onClose={onClose}>
      <ModalContent>
        <ModalHeader className="flex flex-col gap-1">{title}</ModalHeader>
        <ModalBody>
          {order.orderDetails.map(orderDetail =>
            <p>x{orderDetail.quantity} {orderDetail.item.name}  = ${orderDetail.quantity * orderDetail.unitPrice}</p>
          )}
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}

export default ModalOrderDetail;
