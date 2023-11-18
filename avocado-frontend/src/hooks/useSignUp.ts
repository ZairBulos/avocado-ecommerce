import { useFormik } from "formik";

import { userSchema } from "../schemas/userSchema";
import authService from "../services/AuthService";
import { Register } from "../types/Register";
import { useAuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export const useSignUp = () => {
  const initialValues = {
    email: "",
    password: "",
    confirmPassword: "",
  };
  const { login } = useAuthContext();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: userSchema(),
    validateOnChange: true,
    validateOnBlur: true,
    onSubmit: (entity: Register) => handleSubmit(entity),
  });

  const handleSubmit = async (user: Register) => {
    try {
      const token = await authService.register(user);
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
