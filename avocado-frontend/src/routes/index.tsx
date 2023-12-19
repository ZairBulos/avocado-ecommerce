import { lazy } from "react";
import { Route, Routes } from "react-router-dom";

import { UserRole } from "../types/User";
import ProtectedRoute from "./ProtectedRoute";

import Home from "../pages/Home";
const Cart = lazy(() => import("../pages/Cart"));
const Items = lazy(() => import("../pages/Items"));
const ItemDetail = lazy(() => import("../pages/ItemDetail"));
const SignIn = lazy(() => import("../components/SignIn/SignIn"));
const SignUp = lazy(() => import("../components/SignUp/SignUp"));
const Unauthorized = lazy(() => import("../pages/Unauthorized"));
const NotFound = lazy(() => import("../pages/NotFound"));

const Orders = lazy(() => import("../pages/Orders"));

const AdminRoute = lazy(() => import("./AdminRoute"));

function IndexRoute() {
  return (
    <Routes>
      {/* Public routes */}
      <Route path="/" element={<Home />} />
      <Route path="/products" element={<Items />} />
      <Route path="/products">
        <Route path=":id" element={<ItemDetail />} />
      </Route>
      <Route path="/sign-in" element={<SignIn />} />
      <Route path="/sign-up" element={<SignUp />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/unauthorized" element={<Unauthorized />} />
      <Route path="*" element={<NotFound />} />

      {/* User routes */}
      <Route
        path="/orders"
        element={
          <ProtectedRoute role={UserRole.CLIENT}>
            <Orders />
          </ProtectedRoute>
        }
      />

      {/* Admin routes */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute role={UserRole.ADMIN}>
            <AdminRoute />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default IndexRoute;
