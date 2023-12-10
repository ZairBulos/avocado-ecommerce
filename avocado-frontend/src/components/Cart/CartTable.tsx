import { ItemCart } from "../../context/CartContext";
import CartItem from "./CartItem";

function CartTable({ items }: { items: ItemCart[] }) {
  return (
    <table className="w-full text-left">
      <tbody>
        {items.map((itemCart) => (
          <CartItem key={itemCart.item.id} itemCart={itemCart} />
        ))}
      </tbody>
    </table>
  );
}

export default CartTable;
