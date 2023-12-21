import CloseIcon from "../../assets/close";
import { Item } from "../../types/Item";
import ItemForm from "../Item/ItemForm";

function ItemFormModal({
  isOpen,
  item,
  onClose,
  onReload,
}: {
  isOpen: boolean;
  item?: Item;
  onClose: () => void;
  onReload: () => void;
}) {
  return isOpen && (
    <div
      id="default-modal"
      tabIndex={-1}
      aria-hidden="true"
      className="fixed inset-0 overflow-y-hidden overflow-x-hidden z-50 bg-black bg-opacity-50 flex justify-center items-center"
    >
      <div className="relative p-4 w-full max-w-4xl max-h-full">
        {/* Modal content */}
        <div className="relative bg-white rounded-lg shadow">
          {/* Modal header */}
          <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t">
            <h3 className="text-xl font-semibold text-gray-900">
              {item ? "Edit" : "Create"} Product
            </h3>
            <button
              type="button"
              className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center"
              onClick={onClose}
            >
              <CloseIcon />
              <span className="sr-only">Close modal</span>
            </button>
          </div>

          {/* Modal Body */}
          <div className="p-4 md:p-5 space-y-4">
            <ItemForm onCancel={onClose} onReload={onReload} item={item} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ItemFormModal;
