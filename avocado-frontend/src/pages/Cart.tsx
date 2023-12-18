import { useNavigate } from "react-router-dom";
import CartEmpty from "../components/Cart/CartEmpty";
import CartFooter from "../components/Cart/CartFooter";
import CartTable from "../components/Cart/CartTable";
import { useAuthContext } from "../context/AuthContext";
import { useCartContext } from "../context/CartContext";
import { useCreateOrder } from "../hooks/useCreateOrder";
import { toastError, toastSuccess } from "../utils/TostifyUtil";
import { useModal } from "../hooks/useModal";
import ModalConfirmation from "../components/Modal/ModalConfirmation";

function Cart() {
  const navigate = useNavigate();

  const { user } = useAuthContext();
  const { items, getCartTotal, clearCart } = useCartContext();

  const { isOpen, onToggle } = useModal();
  const { createOrder } = useCreateOrder();

  const handleCheckOut = async () => {
    if (user && user.role === "CLIENT") {
      try {
        await createOrder(items, user);
        toastSuccess(`Order placed successfully`);
        clearCart();
        onToggle();
      } catch (error) {
        toastError(`The order could not be placed`);
      }
    } else {
      navigate("/sign-in", { state: { from: "/cart" } });
    }
  };

  return (
    <main>
      <section className="mx-auto py-8 px-8 lg:px-40">
        {items.length === 0 ? <CartEmpty /> : <CartTable items={items} />}
      </section>
      <section className="mx-auto pb-8 px-8 lg:px-40">
        <CartFooter total={getCartTotal()} onCheckOut={onToggle} />
      </section>
      <ModalConfirmation
        isOpen={isOpen}
        title="Confirm Order"
        onAction={handleCheckOut}
        onClose={onToggle}
      >
        <p>Are you sure you want to place the order?</p>
      </ModalConfirmation>
    </main>
  );
}

export default Cart;
