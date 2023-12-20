import { useState } from "react";
import Products from "../../pages/Products";
import Sidebar from "../Sidebar/Sidebar";

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
        {currentComponent === 'Statisics' && <h1>Statisics</h1>}
      </div>
    </div>
  );
}

export default Dashboard;
