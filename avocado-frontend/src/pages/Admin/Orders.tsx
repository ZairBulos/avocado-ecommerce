import { useOrders } from "../../hooks/useOrders";
import Loader from "../../components/Loader/Loader";
import OrderTable from "../../components/Order/OrderTable";

function Orders() {
  const { orders, loading } = useOrders();

  return (
    <main>
      {loading ? (
        <Loader />
      ) : (
        <section className="pt-8">
          <div className="mb-4">
            <h1 className="text-2xl font-bold">Orders</h1>
          </div>
          <OrderTable orders={orders} />
        </section>
      )}
    </main>
  );
}

export default Orders;
