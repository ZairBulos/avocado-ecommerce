import { Link } from "react-router-dom";

import AvoIcon from "../../assets/avo-icon";
import CartDropdown from "../Dropdown/CartDropdown";
import ProfileDropdown from "../Dropdown/ProfileDropdown";

function Header() {
  return (
    <nav>
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <Link 
          to="/"
          className="flex items-center space-x-2"
        >
          <AvoIcon width="32" height="32" />
          <span className="self-center text-2xl font-semibold whitespace-nowrap">Avo Store</span>
        </Link>

        {/* Dropdowns */}
        <div className="flex space-x-4">
          <CartDropdown />
          <ProfileDropdown />
        </div>
      </div>
    </nav>
  );
}

export default Header;
