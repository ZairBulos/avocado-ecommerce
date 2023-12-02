import { lazy } from "react";
import { Route, Routes } from "react-router-dom";

import Home from "../pages/Home";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
const ItemDetail = lazy(() => import("../pages/ItemDetail"));
const SignIn = lazy(() => import("../components/SignIn/SignIn"));
const SignUp = lazy(() => import("../components/SignUp/SignUp"));

function IndexRoute() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/items" >
          <Route path=":id" element={<ItemDetail />} />
        </Route>
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
      </Routes>
      <Footer />
    </>
  );
}

export default IndexRoute;
