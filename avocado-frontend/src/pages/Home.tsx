import { useState } from "react";

import { Item } from "../types/Item";
import itemsJSON from "../mocks/items.json";
import ItemList from "../components/Item/ItemList";
import CustomPagination from "../components/Pagination/Pagination";

function Home() {
  const [items, setItems] = useState<Item[]>(itemsJSON);

  const handlePageChange = (current: number) => {
    console.log(current);
  }; 

  return (
    <>
      <ItemList items={items} />
      <CustomPagination totalPages={4} handlePageChange={handlePageChange} />
    </>
  );
}

export default Home;
