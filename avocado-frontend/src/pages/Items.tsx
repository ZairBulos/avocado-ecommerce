import ItemList from "../components/Item/ItemList";
import Loader from "../components/Loader/Loader";
import { useItems } from "../hooks/useItems";

function Items() {
  const { items, loading } = useItems();

  return (
    <main>
      {loading ? (
        <Loader />
      ) : (
        <ItemList items={items} />
      )}
    </main>
  );
}

export default Items;
