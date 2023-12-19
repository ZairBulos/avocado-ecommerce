import "react-toastify/dist/ReactToastify.css";
import { Suspense } from "react";
import { ToastContainer } from "react-toastify";

import IndexRoute from "./routes";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Loader from "./components/Loader/Loader";

function App() {
  return (
    <>
      <Header />
      <Suspense fallback={<Loader color="fill-gray-500" />}>
        <IndexRoute />
      </Suspense>
      <Footer />
      <ToastContainer />
    </>
  );
}

export default App;
