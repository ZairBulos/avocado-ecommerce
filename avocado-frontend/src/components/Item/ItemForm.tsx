import { Item, ItemShape } from "../../types/Item";
import { useCreateItem } from "../../hooks/useCreateItem";
import { toastError, toastSuccess } from "../../utils/TostifyUtil";

function ItemForm({
  onCancel,
  onReload,
  item,
}: {
  onCancel: () => void;
  onReload: () => void;
  item?: Item;
}) {
  const { formik } = useCreateItem({ onReload, item });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      await formik.handleSubmit(e);
      
      onCancel();
      toastSuccess("Item saved successfully");
    } catch (error) {
      toastError("An error occurred");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="col-span-1">
          <label
            htmlFor="name"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            placeholder="Item Name"
            value={formik.values.name}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
          {formik.touched.name && formik.errors.name && (
            <p className="text-sm text-red-500">{formik.errors.name}</p>
          )}
        </div>

        <div className="col-span-1">
          <label htmlFor="image">Image</label>
          <input
            id="image"
            name="image"
            type="text"
            placeholder="Item Image"
            value={formik.values.image}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
          {formik.touched.image && formik.errors.image && (
            <p className="text-sm text-red-500">{formik.errors.image}</p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="col-span-1">
          <label htmlFor="sellPrice">Sell Price</label>
          <input
            id="sellPrice"
            name="sellPrice"
            type="number"
            placeholder="Item Sell Price"
            value={formik.values.sellPrice}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
          {formik.touched.sellPrice && formik.errors.sellPrice && (
            <p className="text-sm text-red-500">{formik.errors.sellPrice}</p>
          )}
        </div>

        <div className="col-span-1">
          <label htmlFor="currentStock">Current Stock</label>
          <input
            id="currentStock"
            name="currentStock"
            type="number"
            placeholder="Item Current Stock"
            value={formik.values.currentStock}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
          {formik.touched.currentStock && formik.errors.currentStock && (
            <p className="text-sm text-red-500">{formik.errors.currentStock}</p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="col-span-1">
          <label htmlFor="taste">Taste</label>
          <input
            id="taste"
            name="taste"
            type="text"
            placeholder="Item Taste"
            value={formik.values.taste}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
          {formik.touched.taste && formik.errors.taste && (
            <p className="text-sm text-red-500">{formik.errors.taste}</p>
          )}
        </div>

        <div className="col-span-1">
          <label htmlFor="hardiness">Hardiness</label>
          <input
            id="hardiness"
            name="hardiness"
            type="number"
            placeholder="Item Hardiness"
            value={formik.values.hardiness}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
          {formik.touched.hardiness && formik.errors.hardiness && (
            <p className="text-sm text-red-500">{formik.errors.hardiness}</p>
          )}
        </div>
      </div>

      <div>
        <label htmlFor="shape">Shape</label>
        <select
          id="shape"
          name="shape"
          value={formik.values.shape}
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 bg-white"
        >
          <option value=""></option>
          <option value={ItemShape.OVAL}>{ItemShape.OVAL}</option>
          <option value={ItemShape.PEAR}>{ItemShape.PEAR}</option>
          <option value={ItemShape.ROUND}>{ItemShape.ROUND}</option>
          <option value={ItemShape.PLUMP}>{ItemShape.PLUMP}</option>
          <option value={ItemShape.OBOVATE}>{ItemShape.OBOVATE}</option>
          <option value={ItemShape.LONG_PEAR}>{ItemShape.LONG_PEAR}</option>
        </select>
        {formik.touched.shape && formik.errors.shape && (
          <p className="text-sm text-red-500">{formik.errors.shape}</p>
        )}
      </div>

      <div>
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          name="description"
          cols={10}
          rows={3}
          placeholder="Item Description"
          value={formik.values.description}
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
        />
        {formik.touched.description && formik.errors.description && (
          <p className="text-sm text-red-500">{formik.errors.description}</p>
        )}
      </div>

      <div className="flex space-x-2 justify-end">
        <button
          type="button"
          onClick={onCancel}
          className="bg-white text-danger border border-red-400 hover:bg-red-400 hover:text-white py-2 px-4 rounded-md"
        >
          Cancel
        </button>

        <button
          type="submit"
          disabled={!formik.isValid}
          className="bg-green-400 py-2 px-4 rounded-md"
        >
          Confirm
        </button>
      </div>
    </form>
  );
}

export default ItemForm;
