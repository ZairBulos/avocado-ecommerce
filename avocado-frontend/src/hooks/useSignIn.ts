import { useFormik } from "formik";

import { Login } from "../types/Login";
import { loginSchema } from "../schemas/loginSchema";
import authService from "../services/AuthService";
import { decodeToken } from "../utils/JwtUtil";

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
    try {
      const token = await authService.login(user);
      const decodedToken = decodeToken(token.accessToken);
      console.log(decodedToken);
    } catch (error) {
      console.log(error);
    }
  };

  return {
    formik,
  };
};
