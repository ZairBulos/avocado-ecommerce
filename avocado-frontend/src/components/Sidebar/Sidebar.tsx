import StoreIcon from "../../assets/store";
import ReportAnalyticsIcon from "../../assets/report-analytics";

function Sidebar({
  onChangeComponent,
}: {
  onChangeComponent: (component: string) => void;
}) {
  return (
    <aside className="bg-[#6a994e] text-white h-screen w-52">
      <div className="flex items-center justify-between p-4">
        <div className="text-[#132a13] text-2xl font-bold">Avo Store</div>
      </div>

      <nav>
        <ul className="space-y-2 p-4">
        <li>
            <button
              onClick={() => onChangeComponent("Orders")}
              className="flex items-center space-x-2 pb-2 hover:text-[#132a13]"
            >
              <StoreIcon width="20" height="20" />
              <span>Orders</span>
            </button>
          </li>
          <li>
            <button
              onClick={() => onChangeComponent("Products")}
              className="flex items-center space-x-2 pb-2 hover:text-[#132a13]"
            >
              <StoreIcon width="20" height="20" />
              <span>Products</span>
            </button>
          </li>
          <li>
            <button
              onClick={() => onChangeComponent("Statistics")}
              className="flex items-center space-x-2 pb-2 hover:text-[#132a13]"
            >
              <ReportAnalyticsIcon width="20" height="20" />
              <span>Statistics</span>
            </button>
          </li>
        </ul>
      </nav>
    </aside>
  );
}

export default Sidebar;
