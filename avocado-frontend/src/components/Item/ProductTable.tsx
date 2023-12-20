import { Item } from "../../types/Item";
import ProductItem from "./ProductItem";

function ProductTable({
  items,
  onReload,
}: {
  items: Item[];
  onReload: () => void;
}) {
  return (
    <div className="overflow-y-auto max-h-[500px]">
      <table className="w-full text-left">
        <thead className="bg-black text-white text-xs uppercase">
          <tr>
            <th scope="col" className="px-6 py-3">
              Name
            </th>
            <th scope="col" className="px-6 py-3">
              Blocked
            </th>
            <th scope="col" className="px-6 py-3">
              Sell Price
            </th>
            <th scope="col" className="px-6 py-3">
              Current Stock
            </th>
            <th scope="col" className="px-6 py-3 text-center" colSpan={2}>
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <ProductItem key={item.id} item={item} onReload={onReload} />
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ProductTable;
