import { useFormik } from "formik";

import { Login } from "../types/Login";
import { loginSchema } from "../schemas/loginSchema";

export const useSignIn = () => {
  const initialValues = {
    email: "",
    password: ""
  };

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: loginSchema(),
    validateOnChange: true,
    validateOnBlur: true,
    onSubmit: (entity: Login) => handleSubmit(entity),
  });

  const handleSubmit = async (user: Login) => {
    console.log(user);
  };

  return {
    formik,
  };
};
