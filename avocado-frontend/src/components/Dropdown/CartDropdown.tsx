import { Link } from "react-router-dom";

import BasketIcon from "../../assets/basket";
import { useCartContext } from "../../context/CartContext";
import { useBoolean } from "../../hooks/useBoolean";

function CartDropdown() {
  const { items, getCartTotal } = useCartContext();
  const { isTrue: isOpen, onToggle: toggleDropdown } = useBoolean();

  const totalUnitsInCart = items.reduce(
    (total, item) => total + item.quantity,
    0
  );

  return (
    <div className="relative inline-block text-left">
      <button
        type="button"
        onClick={toggleDropdown}
        className="focus:outline-none"
      >
        <BasketIcon width="32" height="32" />
      </button>

      {isOpen && (
        <div className="origin-top-left absolute left-1/2 transform -translate-x-1/2 mt-2 w-44 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
          <ul
            className="py-2 text-sm text-gray-700"
            aria-labelledby="dropdownDefaultButton"
          >
            <li>
              <Link to="/cart" className="block px-4 py-2 hover:bg-gray-100">
                <div className="text-sm">Cart</div>
                <div className="text-xs text-gray-500">
                  {totalUnitsInCart} Items - Total ${getCartTotal()}
                </div>
              </Link>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}

export default CartDropdown;
