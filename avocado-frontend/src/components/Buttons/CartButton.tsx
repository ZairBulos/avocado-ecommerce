import {
  DropdownItem,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  Button,
} from "@nextui-org/react";
import BasketIcon from "../../assets/basket";

function CartButton() {
  return (
    <Dropdown placement="bottom-end">
      <DropdownTrigger>
        <Button isIconOnly aria-label="Cart" variant="light">
          <BasketIcon width="32" height="32" />
        </Button>
      </DropdownTrigger>
      <DropdownMenu aria-label="Cart Actions" variant="faded">
        <DropdownItem key="cart" description="8 Items - Subtotal: $999">
          View Cart
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
}

export default CartButton;
