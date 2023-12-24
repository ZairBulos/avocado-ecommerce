import Loader from "../../components/Loader/Loader";
import { useProducts } from "../../hooks/useProducts";
import ItemTable from "../../components/Item/ItemTable";
import ItemFormModal from "../../components/Modal/ItemFormModal";
import { useBoolean } from "../../hooks/useBoolean";
import PlusIcon from "../../assets/plus";

function Items() {
  const { items, loading, onReload } = useProducts();
  const { isTrue: isOpenForm, onToggle: toggleForm } = useBoolean();

  return (
    <main>
      {loading ? (
        <Loader />
      ) : (
        <>
          <section className="pt-8">
            <div className="flex space-x-4 items-center mb-4">
              <h1 className="text-2xl font-bold">Products</h1>
              <button
                aria-label="add-item"
                onClick={() => toggleForm()}
                className="bg-[#6a994e] p-1 rounded-md"
              >
                <PlusIcon />
              </button>
            </div>

            <ItemTable items={items} onReload={onReload} />
          </section>

          <ItemFormModal
            isOpen={isOpenForm}
            onClose={toggleForm}
            onReload={onReload}
          />
        </>
      )}
    </main>
  );
}

export default Items;
