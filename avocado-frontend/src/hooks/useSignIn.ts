import { useFormik } from "formik";
import { useLocation, useNavigate } from "react-router-dom";

import { useAuthContext } from "../context/AuthContext";
import { loginSchema } from "../schemas/loginSchema";
import AuthService from "../services/AuthService";
import { Auth } from "../types/Auth";

export const useSignIn = () => {
  const initialValues = {
    email: "",
    password: "",
  };
  const { login } = useAuthContext();
  const location = useLocation();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: loginSchema(),
    validateOnChange: true,
    validateOnBlur: true,
    onSubmit: (entity: Auth) => handleSubmit(entity),
  });

  const handleSubmit = async (user: Auth) => {
    try {
      const token = await AuthService.login(user);
      login(token.accessToken);

      const from = (location.state && location.state.from) || "/";
      navigate(from);
    } catch (error) {
      console.log(error);
    }
  };

  return {
    formik,
  };
};
