import { Base } from "./Base";
import { UserRole } from "./UserRole";

export interface User extends Base {
  email: string;
  role: UserRole;
}
