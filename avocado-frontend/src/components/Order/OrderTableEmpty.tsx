function OrderTableEmpty() {
  return (
    <div className="p-4 bg-red-50 border border-red-300 rounded-md">
      <h1 className="text-xl font-semibold text-red-600">No Orders Yet</h1>
      <p className="text-red-600">
        It looks like you haven't placed any orders with us. Explore our products and start your shopping journey!
      </p>
    </div>
  );
}

export default OrderTableEmpty;
