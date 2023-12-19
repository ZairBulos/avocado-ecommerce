function Unauthorized() {
  return (
    <main className="h-screen flex items-center justify-center">
      <p className="text-2xl font-bold text-center mx-auto">
        401 | You do not have permissions to view this page.
      </p>
    </main>
  );
}

export default Unauthorized;
