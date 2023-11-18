import * as Yup from "yup";

export const loginSchema = () => {
  return Yup.object().shape({
    email: Yup.string()
      .trim()
      .required("Email is required")
      .email("Enter a valid email address"),
    password: Yup.string()
      .trim()
      .required("Password is required")
      .min(8, "Must be at least 8 characters")
      .matches(
        /(?=.*[a-z])/g,
        "Must contain at least one lowercase letter (a-z)"
      )
      .matches(
        /(?=.*[A-Z])/g,
        "Must contain at least one capital letter (A-Z)"
      )
      .matches(
        /(?=.*\d)/g, 
        "Must contain at least one number (0-9)"
      )
      .matches(
        /(?=.*[!@#$%^&*])/g,
        "Must contain at least one special character (such as !@#$%^&)"
      )
      .test(
        "passwordComplexity",
        "Must contain at least 3 of the following 4 character types",
        (val) => {
          if (!val) return false;
          const counts = [/[a-z]/, /[A-Z]/, /\d/, /[!@#$%^&*]/]
            .map((regex) => regex.test(val))
            .filter((match) => match).length;
          return counts >= 3;
        }
      ),
  });
};
