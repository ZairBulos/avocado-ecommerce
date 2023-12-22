import { useState } from "react";
import { useFormik } from "formik";
import { useLocation, useNavigate } from "react-router-dom";

import { useAuthContext } from "../context/AuthContext";
import { userSchema } from "../schemas/userSchema";
import AuthService from "../services/AuthService";
import { Auth } from "../types/Auth";

const initialValues = {
    email: "",
    password: "",
    confirmPassword: "",
  };

export const useSignUp = () => {
  const [error, setError] = useState<boolean>(false);
  const { login } = useAuthContext();
  const location = useLocation();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: userSchema(),
    validateOnChange: true,
    validateOnBlur: true,
    onSubmit: (entity: Auth) => onSubmit(entity),
  });

  const onSubmit = async (user: Auth) => {
    try {
      setError(false);
      
      const token = await AuthService.register(user);
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
