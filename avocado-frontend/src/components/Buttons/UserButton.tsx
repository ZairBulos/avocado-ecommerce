import {
  Dropdown,
  DropdownItem,
  DropdownTrigger,
  DropdownSection,
  DropdownMenu,
  Button,
} from "@nextui-org/react";
import { Link } from "react-router-dom";
import LogoutIcon from "../../assets/logout";
import UserFilledIcon from "../../assets/user-filled";
import { useLogOut } from "../../hooks/useLogOut";
import { User } from "../../types/User";
import ShoppingBagIcon from "../../assets/shopping-bag";
import LayoutDashboardIcon from "../../assets/layout-dashboard";

function UserButton({ user }: { user: User }) {
  const { handleLogOut } = useLogOut();

  return (
    <>
      {user.role === "ADMIN" ? (
        <Dropdown placement="bottom-end">
          <DropdownTrigger>
            <Button isIconOnly aria-label="Profile" variant="light">
              <UserFilledIcon width="32" height="32" />
            </Button>
          </DropdownTrigger>

          <DropdownMenu variant="faded" aria-label="Profile Actions">
            <DropdownSection showDivider>
              <DropdownItem key="profile" className="h-14 gap-2">
                <p className="font-semibold">Signed in as</p>
                <p className="font-semibold">{user.email}</p>
              </DropdownItem>
            </DropdownSection>

            <DropdownSection showDivider>
              <DropdownItem
                key="dashboard"
                color="primary"
                startContent={<LayoutDashboardIcon width="16" height="16" />}
              >
                <Link to="/dashboard">Dashboard</Link>
              </DropdownItem>
            </DropdownSection>

            <DropdownSection showDivider>
              <DropdownItem
                key="logout"
                color="danger"
                className="text-danger"
                onClick={handleLogOut}
                startContent={<LogoutIcon width="16" height="16" />}
              >
                Log Out
              </DropdownItem>
            </DropdownSection>
          </DropdownMenu>
        </Dropdown>
      ) : (
        <Dropdown placement="bottom-end">
          <DropdownTrigger>
            <Button isIconOnly aria-label="Profile" variant="light">
              <UserFilledIcon width="32" height="32" />
            </Button>
          </DropdownTrigger>

          <DropdownMenu variant="faded" aria-label="Profile Actions">
            <DropdownSection showDivider>
              <DropdownItem key="profile" className="h-14 gap-2">
                <p className="font-semibold">Signed in as</p>
                <p className="font-semibold">{user.email}</p>
              </DropdownItem>
            </DropdownSection>

            <DropdownSection showDivider>
              <DropdownItem
                key="orders"
                color="primary"
                startContent={<ShoppingBagIcon width="16" height="16" />}
              >
                <Link to="/orders">My Orders</Link>
              </DropdownItem>
            </DropdownSection>

            <DropdownSection showDivider>
              <DropdownItem
                key="logout"
                color="danger"
                className="text-danger"
                onClick={handleLogOut}
                startContent={<LogoutIcon width="16" height="16" />}
              >
                Log Out
              </DropdownItem>
            </DropdownSection>
          </DropdownMenu>
        </Dropdown>
      )}
    </>
  );
}

export default UserButton;
