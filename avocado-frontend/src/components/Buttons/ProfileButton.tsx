import {
  Dropdown,
  DropdownItem,
  DropdownTrigger,
  DropdownSection,
  DropdownMenu,
  Button,
} from "@nextui-org/react";
import { Link } from "react-router-dom";
import UserIcon from "../../assets/user";

function ProfileButton() {
  return (
    <Dropdown placement="bottom-end">
      <DropdownTrigger>
        <Button isIconOnly aria-label="Profile" variant="light">
          <UserIcon width="32" height="32" />
        </Button>
      </DropdownTrigger>

      <DropdownMenu variant="faded" aria-label="Profile Actions">
        <DropdownSection showDivider>
            <DropdownItem key="sign-in">
              <Link to="/sign-in">Sign In</Link>
            </DropdownItem>
            <DropdownItem key="sign-up">
              <Link to="/sign-up">Sign Up</Link>
            </DropdownItem>
        </DropdownSection>
      </DropdownMenu>
    </Dropdown>
  );
}

export default ProfileButton;
