import ItemList from "../components/Item/ItemList";
import Loader from "../components/Loader/Loader";
import { useItems } from "../hooks/useItems";

function Home() {
  const { items, loading } = useItems();

  return (
    <main>
      {loading ? (
        <Loader label="Loading..." color="success" labelColor="success" />
      ) : (
        <ItemList items={items} />
      )}
    </main>
  );
}

export default Home;
