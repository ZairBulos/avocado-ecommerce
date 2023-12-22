import { Link } from "react-router-dom";
import { ItemSimple } from "../../types/Item";

function ItemCard({ item }: { item: ItemSimple }) {
  return (
    <div
      role="listitem"
      className="border border-md border-gray-300 shadow-md transition-transform hover:-translate-y-1"
    >
      <div>
        <Link to={`/products/${item.id}`}>
          <img
            src={item.image}
            alt={item.name}
            className="mx-auto object-cover h-80"
          />
        </Link>
      </div>
      <div className="flex justify-between p-4 border-t border-gray-300">
        <h2 className="text-lg font-bold">{item.name}</h2>
        <p className="text-gray-600">{item.sellPrice}</p>
      </div>
    </div>
  );
}

export default ItemCard;
