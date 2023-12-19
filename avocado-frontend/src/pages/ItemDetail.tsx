import { useEffect } from "react";
import { useParams } from "react-router-dom";

import { useItem } from "../hooks/useItem.ts";
import ItemOverview from "../components/Item/ItemOverview";
import Loader from "../components/Loader/Loader.tsx";

function ItemDetail() {
  const { id } = useParams();
  const { item, loading, fetchItem } = useItem();

  useEffect(() => {
    fetchItem(Number(id));
  }, [id]);

  return (
    <main>
      {loading ? (
        <Loader />
      ) : (
        <ItemOverview item={item} />
      )}
    </main>
  );
}

export default ItemDetail;
