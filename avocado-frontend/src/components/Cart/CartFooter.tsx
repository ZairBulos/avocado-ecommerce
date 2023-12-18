function CartFooter({
  total,
  onCheckOut,
}: {
  total: number;
  onCheckOut: () => void;
}) {
  return (
    <div className="grid grid-cols-2 items-center border rounded-md p-4">
      <div className="col-span-1">
        <p>
          <b>Total:</b> ${total}
        </p>
      </div>
      <div className="col-span-1 text-right">
        <button
          disabled={total === 0}
          onClick={() => onCheckOut()}
          className="bg-black text-white py-2 px-4 rounded-md hover:opacity-90"
        >
          Check out
        </button>
      </div>
    </div>
  );
}

export default CartFooter;
