import MinusIcon from "../../assets/minus";
import PlusIcon from "../../assets/plus";
import TrashIcon from "../../assets/trash";
import { ItemCart, useCartContext } from "../../context/CartContext";

function CartItem({ itemCart }: { itemCart: ItemCart }) {
  const { addToCart, reduceQuantityFromCart, removeFromCart } =
    useCartContext();

  return (
    <tr className="border-b">
      <td scope="row" className="px-6 py-3 hidden md:block">
        <img
          src={itemCart.item.image}
          alt={itemCart.item.name}
          className="h-[25vh] mx-auto"
        />
      </td>
      <td scope="row" className="px-6 py-3">
        <h1 className="text-xl font-semibold">{itemCart.item.name}</h1>
        <p className="text-gray-500">
          {itemCart.quantity} x {itemCart.item.sellPrice}
        </p>
      </td>
      <td scope="row" className="px-6 py-3">
        <button
          className="border rounded-md p-2 hover:bg-gray-300"
          onClick={() => reduceQuantityFromCart(itemCart.item.id)}
        >
          <MinusIcon height="16" width="16" />
        </button>
      </td>
      <td scope="row" className="px-6 py-3">
        <button
          className="border rounded-md p-2 hover:bg-green-300"
          onClick={() => addToCart(itemCart.item, 1)}
        >
          <PlusIcon height="16" width="16" />
        </button>
      </td>
      <td scope="row" className="px-6 py-3">
        <button
          className="border rounded-md p-2 hover:bg-red-300"
          onClick={() => removeFromCart(itemCart.item.id)}
        >
          <TrashIcon height="16" width="16" />
        </button>
      </td>
    </tr>
  );
}

export default CartItem;
