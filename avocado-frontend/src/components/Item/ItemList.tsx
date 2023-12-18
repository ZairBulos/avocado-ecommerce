import { ItemSimple } from "../../types/Item";
import ItemCard from "./ItemCard";

function ItemList({ items }: { items: ItemSimple[] }) {
  return (
    <div
      role="list"
      className="grid grid-cols-1 lg:grid-cols-2 p-8 gap-4 max-w-[900px] mx-auto"
    >
      {items.map((item) => (
        <ItemCard key={item.id} item={item} />
      ))}
    </div>
  );
}

export default ItemList;
