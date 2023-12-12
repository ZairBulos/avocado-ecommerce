import { lazy } from "react";
import { Route, Routes } from "react-router-dom";

import Home from "../pages/Home";
const ItemDetail = lazy(() => import("../pages/ItemDetail"));
const SignIn = lazy(() => import("../components/SignIn/SignIn"));
const SignUp = lazy(() => import("../components/SignUp/SignUp"));
const Cart = lazy(() => import("../pages/Cart"));

function IndexRoute() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/items">
        <Route path=":id" element={<ItemDetail />} />
      </Route>
      <Route path="/sign-in" element={<SignIn />} />
      <Route path="/sign-up" element={<SignUp />} />
      <Route path="/cart" element={<Cart />} />
    </Routes>
  );
}

export default IndexRoute;
