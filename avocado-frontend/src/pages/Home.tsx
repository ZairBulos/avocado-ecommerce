import { Link } from "react-router-dom";

function Home() {
  return (
    <main className="h-screen bg-home">
      <section className="flex items-center justify-center h-full mx-auto px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2">
          <div className="lg:col-span-1">
            <h1 className="text-[#132a13] text-4xl font-bold tracking-tighter mb-4">
              Avocado, your daily green lifestyle
            </h1>
            <p className="text-[#132a13] text-lg mb-6">
              Indulge in the exquisite taste of our handpicked, organic avocados. Grown with care on our lush California farm, each avocado is a testament to the richness of nature's flavors. From creamy textures to vibrant green hues, our avocados are a celebration of freshness and quality.
            </p>
            <Link
              to="/products"
              className="bg-[#ecf39e] py-2 px-4 rounded-md hover:opacity-90"
            >
              Explore Our Products
            </Link>
          </div>
          <div className="lg:col-span-1 hidden lg:block">
            <img
              src="/avo-store.webp"
              className="w-full h-96"
              alt="avo-store"
            />
          </div>
        </div>
      </section>
    </main>
  );
}

export default Home;
