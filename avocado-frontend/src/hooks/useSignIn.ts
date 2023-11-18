import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";

import { useAuthContext } from "../context/AuthContext";
import { loginSchema } from "../schemas/loginSchema";
import authService from "../services/AuthService";
import { Login } from "../types/Login";

export const useSignIn = () => {
  const initialValues = {
    email: "",
    password: "",
  };
  const { login } = useAuthContext();
  const navigate = useNavigate();

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
      login(token.accessToken);

      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return {
    formik,
  };
};
