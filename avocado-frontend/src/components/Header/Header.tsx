import { Link } from "react-router-dom";
import { Navbar, NavbarBrand, NavbarContent } from "@nextui-org/react";

import AvoIcon from "../../assets/avo-icon";
import CartButton from "../Buttons/CartButton";
import ProfileButton from "../Buttons/ProfileButton";

function Header() {
  return (
    <Navbar position="static" isBordered>
      <NavbarContent justify="start">
        <NavbarBrand className="mr-4">
          <Link to="/" className="flex items-center">
            <AvoIcon width="36" height="36" />
            <span className="font-bold text-inherit">Avo Store</span>
          </Link>
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
