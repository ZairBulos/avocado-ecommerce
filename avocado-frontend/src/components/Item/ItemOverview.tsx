import React, { useState } from "react";
import { Item } from "../../types/Item";
import { useCartContext } from "../../context/CartContext";
import { toastSuccess } from "../../utils/TostifyUtil";

function ItemOverview({ item }: { item: Item | null }) {
  const [quantity, setQuantity] = useState<number>(1);
  const { addToCart } = useCartContext();

  if (item == null) return;

  const handleQuantityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newQuantity = parseInt(event.target.value, 10);
    setQuantity(newQuantity);
  };

  const handleAddToCart = (event: React.FormEvent) => {
    event.preventDefault();

    addToCart(item, quantity);
    toastSuccess(`${quantity} ${item.name} added to cart`);
    setQuantity(1);
  };

  return (
    <section className="mx-auto py-8 px-8 lg:px-48">
      {/** Image and Basic Information */}
      <div className="grid grid-cols-1 sm:grid-cols-2 items-center">
        <div className="col-span-1">
          <img src={item.image} alt={item.name} />
        </div>

        <div className="col-span-1">
          <h1 className="text-xl font-bold mb-2">{item.name}</h1>
          <p className="text-lg mb-2">$ {item.sellPrice}</p>
          <div className="flex items-center w-full">
            <form onSubmit={handleAddToCart}>
              <input
                type="number"
                min={1}
                max={item.currentStock}
                pattern="^[0-9]+"
                className="p-2 border border-gray-300 text-black"
                disabled={item.currentStock <= 0}
                value={quantity}
                onChange={handleQuantityChange}
              />
              {item.currentStock <= 0 ? (
                <button type="button" className="bg-red-500 hover:bg-red-600 text-white p-2 whitespace-nowrap" disabled>
                  Not available
                </button>
              ) : (
                <button type="submit" className="bg-green-500 hover:bg-green-600 text-white p-2 whitespace-nowrap">
                  Add to cart
                </button>
              )}
            </form>
          </div>
        </div>
      </div>

      {/** Description */}
      <div className="py-4">
        <h2 className="text-lg font-semibold mb-2">About this avocado</h2>
        <p>{item.description}</p>
      </div>

      {/** Attributes Table */}
      <div className="py-4 border-t border-gray-300">
        <table className="w-full text-left">
          <thead className="bg-gray-100 border">
            <tr>
              <th scope="col" className="px-6 py-3 font-semibold">
                Attributes
              </th>
              <th scope="col" className="px-6 py-3"></th>
            </tr>
          </thead>
          <tbody>
            <tr className="bg-white border">
              <td scope="row" className="px-6 py-3 border-r">
                Shape
              </td>
              <td scope="row" className="px-6 py-3">
                {item.attributes.shape}
              </td>
            </tr>
            <tr className="bg-white border">
              <td scope="row" className="px-6 py-3 border-r">
                Hardiness
              </td>
              <td scope="row" className="px-6 py-3">
                {item.attributes.hardiness} ºC
              </td>
            </tr>
            <tr className="bg-white border">
              <td scope="row" className="px-6 py-3 border-r">
                Taste
              </td>
              <td scope="row" className="px-6 py-3">
                {item.attributes.taste}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  );
}

export default ItemOverview;
