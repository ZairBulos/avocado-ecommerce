import EditIcon from "../../assets/edit";
import LockIcon from "../../assets/lock";
import LockOpenIcon from "../../assets/lock-open";

import { Item } from "../../types/Item";
import { useBoolean } from "../../hooks/useBoolean";
import { useLockUnlockItem } from "../../hooks/useLockUnlockItem";
import { toastError, toastSuccess } from "../../utils/TostifyUtil";
import ModalConfirmation from "../Modal/ModalConfirmation";

function ProductItem({ item, onReload }: { item: Item; onReload: () => void }) {
  const { isTrue, onToggle } = useBoolean();
  const { onLockUnlock } = useLockUnlockItem();

  const bgStatusColor = () => {
    return item.blocked
      ? "bg-neutral-400 hover:cursor-not-allowed"
      : "" || item.currentStock === 0
      ? "bg-red-400 hover:cursor-not-allowed"
      : "";
  };

  const handleLockUnlock = async () => {
    try {
      await onLockUnlock(item.id);
      onReload();

      toastSuccess(
        `${item.name} ${item.blocked ? "unlock" : "lock"} successfully`
      );
    } catch (error) {
      toastError("An error occurred");
    }
  };

  return (
    <>
      <tr className={`border ${bgStatusColor()}`}>
        <td scope="row" className="px-6 py-3">
          {item.name}
        </td>
        <td scope="row" className="px-6 py-3">
          {item.blocked ? "Y" : "N"}
        </td>
        <td scope="row" className="px-6 py-3">
          {item.sellPrice}
        </td>
        <td scope="row" className="px-6 py-3">
          {item.currentStock}
        </td>
        <td scope="row" className="px-6 py-3">
          <button
            aria-label="edit-item"
          >
            <EditIcon width="18" height="18" />
          </button>
        </td>
        <td scope="row" className="px-6 py-3">
          <button 
            onClick={() => onToggle()}
            aria-label="lock-unlock-item"
          >
            {item.blocked ? (
              <LockOpenIcon width="18" height="18" />
            ) : (
              <LockIcon width="18" height="18" />
            )}
          </button>
        </td>
      </tr>

      <ModalConfirmation
        title="LockUnlock Product"
        isOpen={isTrue}
        onAction={handleLockUnlock}
        onClose={onToggle}
      >
        <p>
          Are you sure you want to <b>{item.blocked ? "unlock" : "lock"}</b> the
          product <b>"{item.name}"</b>?
        </p>
        <img src={item.image} alt={item.name} className="h-32 mx-auto" />
      </ModalConfirmation>
    </>
  );
}

export default ProductItem;
