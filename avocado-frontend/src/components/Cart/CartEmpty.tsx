function CartEmpty() {
  return (
    <div className="p-4 bg-red-50 border border-red-300 rounded-md">
      <h1 className="text-xl font-semibold text-red-600">Your cart is empty</h1>
      <p className="text-red-600">
        You will need to add some items to the cart before you can checkout.
      </p>
    </div>
  );
}

export default CartEmpty;
