import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

import { BrowserRouter, Routes, Route } from "react-router-dom";

import HomePage from "./landing_page/home/HomePage";
import Signup from "./landing_page/signup/Signup";
import AboutPage from "./landing_page/about/AboutPage";
import SupportPage from "./landing_page/support/SupportPage";
import ProductPage from "./landing_page/products/ProductPage";
import PricingPage from "./landing_page/pricing/PricingPage";
import Login from "./landing_page/login/Login";

const root = ReactDOM.createRoot(
  document.getElementById("root")
);

root.render(
  <BrowserRouter>

    <Routes>


      <Route
        path="/"
        element={<HomePage />}
      />

      <Route
        path="/signup"
        element={<Signup />}
      />
      <Route path="/login" element={<Login />} />

      <Route
        path="/about"
        element={<AboutPage />}
      />

      <Route
        path="/support"
        element={<SupportPage />}
      />

      <Route
        path="/products"
        element={<ProductPage />}
      />

      <Route
        path="/pricing"
        element={<PricingPage />}
      />

      <Route
        path="*"
        element={
          <h1 className="text-center mt-5 text-danger">
            404 Not Found error.
          </h1>
        }
      />

    </Routes>

  </BrowserRouter>
);