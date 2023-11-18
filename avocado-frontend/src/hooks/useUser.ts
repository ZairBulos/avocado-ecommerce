import { useState } from "react";
import { User } from "../types/User";

const defaultUser = {
  id: 0,
  email: "",
  password: "",
  confirmPassword: ""
};

export const useUser = () => {
  const [user, setUser] = useState<User>(defaultUser);

  return { user };
};
