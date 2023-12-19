import { Link } from "react-router-dom";

import { useAuthContext } from "../../context/AuthContext";
import { useLogOut } from "../../hooks/useLogOut";
import { useDropdown } from "../../hooks/useDropdown";
import UserIcon from "../../assets/user";
import LoginIcon from "../../assets/login";
import UserFilledIcon from "../../assets/user-filled";
import ShoppingBagIcon from "../../assets/shopping-bag";
import LayoutDashboardIcon from "../../assets/layout-dashboard";

function ProfileDropdown() {
  const { user } = useAuthContext();
  const { handleLogOut } = useLogOut();
  const { isOpen, toggleDropdown } = useDropdown();

  const commonBlock = (
    <li className="block px-4 py-2 border-b hover:bg-gray-100">
      <p className="font-semibold">Signed in as</p>
      <p className="font-semibold">{user?.email}</p>
    </li>
  );

  return (
    <div className="relative inline-block text-left">
      <button
        type="button"
        onClick={toggleDropdown}
        className="focus:outline-none"
      >
        {user ? (
          <UserFilledIcon width="32" height="32" />
        ) : (
          <UserIcon width="32" height="32" />
        )}
      </button>

      {isOpen && (
        <div className="origin-top-left absolute left-1/2 transform -translate-x-1/2 mt-2 w-44 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
          <ul
            className="py-2 text-sm text-gray-700"
            aria-labelledby="dropdownDefaultButton"
          >
            {!user ? (
              <>
                <li>
                  <Link
                    to="/sign-in"
                    className="block px-4 py-2 hover:bg-gray-100"
                  >
                    Sign In
                  </Link>
                </li>
                <li>
                  <Link
                    to="/sign-up"
                    className="block px-4 py-2 hover:bg-gray-100"
                  >
                    Sign Up
                  </Link>
                </li>
              </>
            ) : (
              <>
                {commonBlock}
                {user.role === "CLIENT" ? (
                  <>
                    <li>
                      <Link
                        to="/orders"
                        className="flex items-center space-x-1 px-4 py-2 border-b hover:bg-gray-100"
                      >
                        <ShoppingBagIcon width="16" height="16" />
                        <span>My Orders</span>
                      </Link>
                    </li>
                  </>
                ) : (
                  <>
                    <li>
                      <Link
                        to="/dashboard"
                        className="flex items-center space-x-1 px-4 py-2 border-b hover:bg-gray-100"
                      >
                        <LayoutDashboardIcon width="16" height="16" />
                        <span>Dashboard</span>
                      </Link>
                    </li>
                  </>
                )}
                <li>
                  <button
                    onClick={handleLogOut}
                    className="flex items-center space-x-1 px-4 py-2 w-full text-danger hover:bg-red-100"
                  >
                    <LoginIcon width="16" height="16" />
                    <span>Log Out</span>
                  </button>
                </li>
              </>
            )}
          </ul>
        </div>
      )}
    </div>
  );
}

export default ProfileDropdown;
