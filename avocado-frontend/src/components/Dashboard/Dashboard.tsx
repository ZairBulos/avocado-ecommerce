import { useState } from "react";

import Sidebar from "../Sidebar/Sidebar";
import Items from "../../pages/Admin/Items";
import Orders from "../../pages/Admin/Orders";
import Statistics from "../../pages/Admin/Statistics";

function Dashboard() {
  const [currentComponent, setCurrentComponent] = useState<string>("Orders");

  const handleChangeComponent = (component: string) => {
    setCurrentComponent(component);
  };

  return (
    <div className="flex">
      <Sidebar onChangeComponent={handleChangeComponent} />

      <div className="mx-auto">
        {currentComponent === "Orders" && <Orders />}
        {currentComponent === "Products" && <Items />}
        {currentComponent === "Statistics" && <Statistics />}
      </div>
    </div>
  );
}

export default Dashboard;
