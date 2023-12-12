import { toast } from "react-toastify";

export function toastInfo(message: string, autoClose?: number) {
  toast.info(message, {
    position: toast.POSITION.TOP_RIGHT,
    autoClose: autoClose,
  });
}

export function toastSuccess(message: string, autoClose?: number) {
  toast.success(message, {
    position: toast.POSITION.TOP_RIGHT,
    autoClose: autoClose,
  });
}

export function toastWarning(message: string, autoClose?: number) {
  toast.warning(message, {
    position: toast.POSITION.TOP_RIGHT,
    autoClose: autoClose,
  });
}

export function toastError(message: string, autoClose?: number) {
  toast.error(message, {
    position: toast.POSITION.TOP_RIGHT,
    autoClose: autoClose,
  });
}
