import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";

import { useAuthContext } from "../context/AuthContext";
import { userSchema } from "../schemas/userSchema";
import AuthService from "../services/AuthService";
import { Auth } from "../types/Auth";

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
    onSubmit: (entity: Auth) => handleSubmit(entity),
  });

  const handleSubmit = async (user: Auth) => {
    try {
      const token = await AuthService.register(user);
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
