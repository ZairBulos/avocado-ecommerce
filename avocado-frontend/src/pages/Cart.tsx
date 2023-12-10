import CartEmpty from "../components/Cart/CartEmpty";
import CartFooter from "../components/Cart/CartFooter";
import CartTable from "../components/Cart/CartTable";
import { useCartContext } from "../context/CartContext";

function Cart() {
  const { items, getCartTotal } = useCartContext();

  return (
    <main>
      <section className="mx-auto py-8 px-8 lg:px-40">
        {items.length === 0 ? <CartEmpty /> : <CartTable items={items} />}
      </section>
      <section className="mx-auto pb-8 px-8 lg:px-40">
        <CartFooter total={getCartTotal()} />
      </section>
    </main>
  );
}

export default Cart;
