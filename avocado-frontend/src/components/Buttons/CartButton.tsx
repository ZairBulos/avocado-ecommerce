import {
  DropdownItem,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  Button,
} from "@nextui-org/react";
import { Link } from "react-router-dom";
import BasketIcon from "../../assets/basket";
import { useCartContext } from "../../context/CartContext";

function CartButton() {
  const { items, getCartTotal } = useCartContext();

  const totalUnitsInCart = items.reduce((total, item) => total + item.quantity, 0);

  return (
    <Dropdown placement="bottom-end">
      <DropdownTrigger>
        <Button isIconOnly aria-label="Cart" variant="light">
          <BasketIcon width="32" height="32" />
        </Button>
      </DropdownTrigger>
      <DropdownMenu aria-label="Cart Actions" variant="faded">
        <DropdownItem key="cart" description={`${totalUnitsInCart} Items - Total $${getCartTotal()}`}>
          <Link to="/cart">View Cart</Link>
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
}

export default CartButton;
