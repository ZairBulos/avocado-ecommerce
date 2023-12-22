import { useItems } from "../hooks/useItems";
import Loader from "../components/Loader/Loader";
import ItemList from "../components/Item/ItemList";

function Items() {
  const { items, loading } = useItems();

  return (
    <main>
      {loading ? (
        <Loader />
      ) : (
        <section>
          <ItemList items={items} />
        </section>
      )}
    </main>
  );
}

export default Items;
