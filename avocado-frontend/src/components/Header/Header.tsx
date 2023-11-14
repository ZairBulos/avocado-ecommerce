import {
  Navbar,
  NavbarBrand,
  NavbarContent,
} from "@nextui-org/react";
import ProfileButton from "../Buttons/ProfileButton";
import CartButton from "../Buttons/CartButton";
import AvoIcon from "../../assets/avo-icon";

function Header() {
  return (
    <Navbar position="static" isBordered>
      <NavbarContent justify="start">
        <NavbarBrand className="mr-4">
          <AvoIcon width="36" height="36" />
          <p className="font-bold text-inherit">Avo Store</p>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent as="div" className="items-center" justify="end">
        <CartButton />
        <ProfileButton />
      </NavbarContent>
    </Navbar>
  );
}

export default Header;
