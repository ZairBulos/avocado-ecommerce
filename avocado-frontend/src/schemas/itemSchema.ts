import * as Yup from "yup";

export const itemSchema = () => {
  return Yup.object().shape({
    id: Yup.number()
      .nullable()
      .min(0),
    name: Yup.string()
      .required("Name is required")
      .trim(),
    description: Yup.string()
      .required("Description is required")
      .trim(),
    image: Yup.string()
      .required("Image is required")
      .trim(),
    sellPrice: Yup.number()
      .required("Sell price is required")
      .min(1, "Sell price must be greater than or equal to 1"),
    currentStock: Yup.number()
      .required("Current stock is required")
      .integer("Current stock must be an integer")
      .min(1, "Current stock must be greater than or equal to 1"),
    shape: Yup.string()
      .required("Shape is required")
      .trim(),
    taste: Yup.string()
      .required("Taste is required")
      .trim(),
    hardiness: Yup.number()
      .required("Hardiness is required")
      .integer("Hardiness must be an integer")
  })
};
