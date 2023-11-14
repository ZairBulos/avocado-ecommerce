import { useState } from "react";
import {
  DropdownItem,
  DropdownTrigger,
  DropdownSection,
  Dropdown,
  DropdownMenu,
  Button,
} from "@nextui-org/react";
import UserIcon from "../../assets/user";
import UserFilledIcon from "../../assets/user-filled";
import LogoutIcon from "../../assets/logout";

function ProfileButton() {
  const [logged, setLogged] = useState<boolean>(false);

  return (
    <Dropdown placement="bottom-end">
      <DropdownTrigger>
        <Button isIconOnly aria-label="User" variant="light">
          {logged ? (
            <UserFilledIcon width="32" height="32" />
          ): (
            <UserIcon width="32" height="32" />
          )}
        </Button>  
      </DropdownTrigger>
      <DropdownMenu variant="faded" aria-label="Profile Actions">
        <DropdownSection showDivider>
          <DropdownItem key="profile" className="h-14 gap-2">
            <p className="font-semibold">Signed in as</p>
            <p className="font-semibold">name@example.com</p>
          </DropdownItem>
          <DropdownItem key="settings">My Orders</DropdownItem>
        </DropdownSection>
        <DropdownSection>
          <DropdownItem 
            key="logout" 
            color="danger" 
            className="text-danger"
            startContent={<LogoutIcon width="16" height="16" />}
          >
            Log Out
          </DropdownItem>
        </DropdownSection>
      </DropdownMenu>
    </Dropdown>
  );
}

export default ProfileButton;
