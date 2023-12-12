import "react-toastify/dist/ReactToastify.css";
import { Suspense } from "react";

import IndexRoute from "./routes";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import LoaderSimple from "./components/Loader/LoderSimple";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <>
      <Header />
      <Suspense fallback={<LoaderSimple color="default" />}>
        <IndexRoute />
      </Suspense>
      <Footer />
      <ToastContainer />
    </>
  );
}

export default App;
