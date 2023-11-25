import ItemList from "../components/Item/ItemList";
import Loader from "../components/Loader/Loader";
import { useItems } from "../hooks/useItems";

function Home() {
  const { items, loading } = useItems();

  return (
    <>
      {loading ? (
        <Loader label="Loading..." color="success" labelColor="success" />
      ) : (
        <ItemList items={items} />
      )}
    </>
  );
}

export default Home;
