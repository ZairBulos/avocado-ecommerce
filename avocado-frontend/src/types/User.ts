import { Base } from "./Base";

export interface User extends Base {
  email: string;
  role: UserRole;
}

export enum UserRole {
  ADMIN = "ADMIN",
  CLIENT = "CLIENT",
}
