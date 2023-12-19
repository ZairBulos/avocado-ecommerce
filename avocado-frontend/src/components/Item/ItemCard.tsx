import { Link } from "react-router-dom";
import { ItemSimple } from "../../types/Item";

function ItemCard({ item }: { item: ItemSimple }) {
  return (
    <div role="listitem" className="border border-md shadow-md overflow-hidden">
      <div className="overflow-visible p-0">
        <Link to={`/products/${item.id}`}>
          <img
            src={item.image}
            alt={item.name}
            className="mx-auto object-cover hover:scale-105"
          />
        </Link>
      </div>
      <div className="flex justify-between p-4">
        <h2 className="font-bold">{item.name}</h2>
        <p>${item.sellPrice}</p>
      </div>
    </div>
  );
}

export default ItemCard;
