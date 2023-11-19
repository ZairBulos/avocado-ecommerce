import { lazy } from "react";
import { Route, Routes } from "react-router-dom";

import Header from "../components/Header/Header";
import Home from "../pages/Home";
const SignIn = lazy(() => import("../components/SignIn/SignIn"));
const SignUp = lazy(() => import("../components/SignUp/SignUp"));

function IndexRoute() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
      </Routes>
    </>
  );
}

export default IndexRoute;
