import { useState } from "react";
import { useFormik } from "formik";
import { useLocation, useNavigate } from "react-router-dom";

import { useAuthContext } from "../context/AuthContext";
import { loginSchema } from "../schemas/loginSchema";
import AuthService from "../services/AuthService";
import { Auth } from "../types/Auth";

const initialValues = {
  email: "",
  password: "",
};

export const useSignIn = () => {
  const [error, setError] = useState<boolean>(false);
  const { login } = useAuthContext();
  const location = useLocation();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: loginSchema(),
    validateOnChange: true,
    validateOnBlur: true,
    onSubmit: (entity: Auth) => onSubmit(entity),
  });

  const onSubmit = async (user: Auth) => {
    // eslint-disable-next-line no-useless-catch
    try {
      setError(false);
      
      const token = await AuthService.login(user);
      login(token.accessToken);

      const from = (location.state && location.state.from) || "/";
      navigate(from);
    } catch (error) {
      setError(true);
    }
  };

  return {
    formik,
    error
  };
};
