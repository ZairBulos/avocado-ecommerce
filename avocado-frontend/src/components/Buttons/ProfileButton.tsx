import {
  DropdownItem,
  DropdownTrigger,
  DropdownSection,
  Dropdown,
  DropdownMenu,
  Button,
} from "@nextui-org/react";
import { Link } from "react-router-dom";
import UserIcon from "../../assets/user";
import UserFilledIcon from "../../assets/user-filled";
import LogoutIcon from "../../assets/logout";
import { useAuthContext } from "../../context/AuthContext";
import { useLogOut } from "../../hooks/useLogOut";

function ProfileButton() {
  const { user } = useAuthContext();
  const { handleLogOut } = useLogOut();

  return (
    <Dropdown placement="bottom-end">
      <DropdownTrigger>
        <Button isIconOnly aria-label="User" variant="light">
          {user ? (
            <UserFilledIcon width="32" height="32" />
          ) : (
            <UserIcon width="32" height="32" />
          )}
        </Button>
      </DropdownTrigger>
      <DropdownMenu variant="faded" aria-label="Profile Actions">
        <DropdownSection showDivider>
          {user ? (
            <DropdownItem key="profile" className="h-14 gap-2">
              <p className="font-semibold">Signed in as</p>
              <p className="font-semibold">{user?.email}</p>
            </DropdownItem>
          ) : (
            <DropdownItem key="sign-in">
              <Link to="/sign-in">Sign In</Link>
            </DropdownItem>
          )}
        </DropdownSection>
        <DropdownSection>
          <DropdownItem
            key="logout"
            color="danger"
            className="text-danger"
            startContent={<LogoutIcon width="16" height="16" />}
            onClick={handleLogOut}
          >
            Log Out
          </DropdownItem>
        </DropdownSection>
      </DropdownMenu>
    </Dropdown>
  );
}

export default ProfileButton;
