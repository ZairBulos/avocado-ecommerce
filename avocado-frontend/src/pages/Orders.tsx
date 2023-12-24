import { useOrders } from "../hooks/useOrders";
import Loader from "../components/Loader/Loader";
import OrderList from "../components/Order/OrderList";
import OrderListEmpty from "../components/Order/OrderListEmpty";

function Orders() {
  const { orders, loading } = useOrders();

  return (
    <main>
      {loading ? (
        <Loader />
      ) : (
        <section className="mx-auto py-8 px-8 lg:px-40">
          <h1 className="text-2xl font-bold mb-8">Purchase History</h1>
          {orders.length === 0 ? (
            <OrderListEmpty />
          ) : (
            <OrderList orders={orders} />
          )}
        </section>
      )}
    </main>
  );
}

export default Orders;
