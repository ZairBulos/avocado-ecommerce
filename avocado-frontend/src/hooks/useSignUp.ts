import { useFormik } from "formik";

import { useUser } from "./useUser";
import { User } from "../types/User";
import { userSchema } from "../schemas/userSchema";
import authService from "../services/AuthService";

export const useSignUp = () => {
  const { user: initialValues } = useUser();

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: userSchema(),
    validateOnChange: true,
    validateOnBlur: true,
    onSubmit: (entity: User) => handleSubmit(entity),
  });

  const handleSubmit = async (user: User) => {
    try {
      const token = await authService.register(user);
      console.log(token);
    } catch (error) {
      console.log(error);
    }
  };

  return {
    formik,
  };
};
