import { useFormik } from "formik";

import { Item, ItemRequest } from "../types/Item";
import { itemSchema } from "../schemas/itemSchema";
import initialItem from "../mocks/initialItem.json";
import ItemService from "../services/ItemService";
import { useLocalStorage } from "./useLocalStorage";
import { itemToItemRequest } from "../utils/ItemUtil";

export const useCreateItem = ({
  onReload,
  item,
}: {
  onReload: () => void;
  item?: Item;
}) => {
  const { getItemFromLS } = useLocalStorage();

  const getInitialValues = () => {
    return item ? itemToItemRequest(item) : (initialItem as ItemRequest);
  };

  const formik = useFormik({
    initialValues: getInitialValues(),
    validationSchema: itemSchema(),
    validateOnChange: true,
    validateOnBlur: true,
    onSubmit: (entity: ItemRequest) => onSubmit(entity),
  });

  const onSubmit = async (item: ItemRequest) => {
    // eslint-disable-next-line no-useless-catch
    try {
      const token = getItemFromLS("token") || "";

      const { id } = item;

      const newItem =
        id && id !== 0
          ? await ItemService.update(id, item, token)
          : await ItemService.save(item, token);

      const newItemRequest = itemToItemRequest(newItem);

      formik.resetForm({ values: newItemRequest });

      onReload();
    } catch (error) {
      throw error;
    }
  };

  return {
    formik,
  };
};
