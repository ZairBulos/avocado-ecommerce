import Loader from "../components/Loader/Loader";
import OrderTable from "../components/Order/OrderTable";
import OrderTableEmpty from "../components/Order/OrderTableEmpty";
import { useOrders } from "../hooks/useOrders";

function Orders() {
  const { orders, loading } = useOrders();

  return (
    <main>
      {loading ? (
        <Loader />
      ) : (
        <section className="mx-auto py-8 px-8 lg:px-40">
          <h1 className="text-2xl font-bold mb-8">Purchase History</h1>
          {orders.length === 0 ? <OrderTableEmpty /> : <OrderTable orders={orders} />}
        </section>
      )}
    </main>
  );
}

export default Orders;
