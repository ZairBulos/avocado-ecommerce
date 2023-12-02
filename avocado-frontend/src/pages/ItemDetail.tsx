import { useEffect } from "react";
import { useItem } from "../hooks/useItem.ts";
import ItemOverview from "../components/Item/ItemOverview";
import { useParams } from "react-router-dom";
import Loader from "../components/Loader/Loader.tsx";

function ItemDetail() {
  const { id } = useParams();
  const { item, loading, fetchItem } = useItem();

  useEffect(() => {
    fetchItem(Number(id));
  }, [id]);

  return (
    <>
      {loading ? (
        <Loader label="Loading..." color="success" labelColor="success" />
      ) : (
        <ItemOverview item={item} />
      )}
    </>
  );
}

export default ItemDetail;
