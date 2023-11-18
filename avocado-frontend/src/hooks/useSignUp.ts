import { useFormik } from "formik";

import { useUser } from "./useUser";
import { User } from "../types/User";
import { userSchema } from "../schemas/userSchema";

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
    console.log(user);
  };

  return {
    formik,
  };
};
