import { useState } from "react";

import Sidebar from "../Sidebar/Sidebar";
import Products from "../../pages/Products";
import Statistics from "../../pages/Statistics";

function Dashboard() {
  const [currentComponent, setCurrentComponent] = useState<string>("Products");

  const handleChangeComponent = (component: string) => {
    setCurrentComponent(component);
  };

  return (
    <div className="flex">
      <Sidebar onChangeComponent={handleChangeComponent} />

      <div className="mx-auto">
        {currentComponent === 'Products' && <Products />}
        {currentComponent === 'Statistics' && <Statistics />}
      </div>
    </div>
  );
}

export default Dashboard;
