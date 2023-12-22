import { Link } from "react-router-dom";

function Home() {
  return (
    <main>
      <section className="bg-white lg:h-[50vh] py-8 px-4 flex flex-col items-center justify-center">
        <h1 className="text-[#132a13] text-xl lg:text-3xl text-center font-semibold mb-2">
          "Avocado, your daily green lifestyle"
        </h1>
        <h2 className="text-[#132a13] lg:text-lg text-center mb-4">
          The power to keep fresh every day is hidden in <b>Avocado</b>
        </h2>
        <Link to="/products">
          <button className="bg-[#ecf39e] px-6 py-3 rounded-md hover:opacity-90">
            Explore Our Products
          </button>
        </Link>
      </section>

      <section className="bg-[#6a994e] lg:h-[50vh] py-8 px-4">
        <div className="grid grid-cols-2 items-center justify-center">
          <div className="col-span-1 text-center text-white">
            <h2 className="text-lg lg:text-2xl text-center mb-2">
              We are all family
            </h2>
            <p className="lg:text-lg">
              Avocados are available in various shapes and colors.
            </p>
            <p className="lg:text-lg">
              Meet one that suits you.
            </p>
          </div>
          <div className="col-span-1">
            <img 
              src="/avocado-cartoon.webp" 
              alt="avocado-cartoon"
              className="h-40 lg:h-60 mx-auto" 
            />
          </div>
        </div>
      </section>
    </main>
  );
}

export default Home;
