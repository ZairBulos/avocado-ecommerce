import { lazy } from "react";
import { Route, Routes } from "react-router-dom";

import Home from "../pages/Home";
const Items = lazy(() => import("../pages/Items"));
const ItemDetail = lazy(() => import("../pages/ItemDetail"));
const SignIn = lazy(() => import("../components/SignIn/SignIn"));
const SignUp = lazy(() => import("../components/SignUp/SignUp"));
const Orders = lazy(() => import("../pages/Orders"));
const Cart = lazy(() => import("../pages/Cart"));

function IndexRoute() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/products" element={<Items />} />
      <Route path="/items">
        <Route path=":id" element={<ItemDetail />} />
      </Route>
      <Route path="/sign-in" element={<SignIn />} />
      <Route path="/sign-up" element={<SignUp />} />
      <Route path="/orders" element={<Orders />} />
      <Route path="/cart" element={<Cart />} />
    </Routes>
  );
}

export default IndexRoute;
