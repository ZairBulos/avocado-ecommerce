import { ItemRanking } from "../../types/Statistics";

function ItemStatistics({ items }: { items: ItemRanking[] }) {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Items Statistics</h2>

      <div className="bg-gray-200 p-4 border rounded-md">
        <h3 className="text-xl font-semibold text-center border-b border-brown-400">
          Top 5 Items
        </h3>
        <ul className="space-y-2 mt-2">
          {items.map((itemRanking, idx) => (
            <li
              key={itemRanking.item.id}
              className="flex items-center"
            >
              <p>#{idx + 1} {itemRanking.item.name}. {itemRanking.sales} sales</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default ItemStatistics;
