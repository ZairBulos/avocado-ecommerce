import CloseIcon from "../../assets/close";

function ModalConfirmation({
  isOpen,
  title,
  children,
  onClose,
  onAction,
}: {
  isOpen: boolean;
  title: string;
  children: React.ReactNode;
  onClose: () => void;
  onAction: () => void;
}) {
  return isOpen && (
    <div
      id="default-modal"
      tabIndex={-1}
      aria-hidden="true"
      className="fixed inset-0 overflow-y-auto overflow-x-hidden z-50 bg-black bg-opacity-50 flex justify-center items-center"
    >
      <div className="relative p-4 w-full max-w-2xl max-h-full">
        {/* Modal content */}
        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
          {/* Modal header */}
          <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
              {title}
            </h3>
            <button
              type="button"
              className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
              onClick={onClose}
            >
              <CloseIcon />
              <span className="sr-only">Close modal</span>
            </button>
          </div>
          
          {/* Modal Nody */}
          <div className="p-4 md:p-5 space-y-4">{children}</div>
          
          {/* Modal Footer */}
          <div className="flex items-center justify-end space-x-4 p-4">
            <button
              type="button"
              onClick={onClose}
              className="bg-white text-danger border border-red-400 hover:bg-red-400 hover:text-white py-2 px-4 rounded-md"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={onAction}
              className="bg-green-400 py-2 px-4 rounded-md"
            >
              Confirm
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ModalConfirmation;
