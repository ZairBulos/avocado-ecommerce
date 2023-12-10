function CartFooter({ total }: { total: number }) {
  return (
    <div className="grid grid-cols-2 items-center border rounded-md p-4">
      <div className="col-span-1">
        <p>
          <b>Total:</b> ${total}
        </p>
      </div>
      <div className="col-span-1 text-right">
        <button className="bg-black text-white py-2 px-4 rounded-md hover:opacity-90" disabled={total===0}>
          Check out
        </button>
      </div>
    </div>
  );
}

export default CartFooter;
