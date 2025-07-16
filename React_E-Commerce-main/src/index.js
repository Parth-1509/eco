import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux/store";
import { Toaster } from "react-hot-toast";

import "./index.css";
import "../node_modules/font-awesome/css/font-awesome.min.css";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";

// Pages
import {
  Home,
  Product,
  Products,
  AboutPage,
  ContactPage,
  Cart,
  Login,
  Register,
  Checkout,
  PageNotFound,
} from "./pages";

// Components
import ScrollToTop from "./components/ScrollToTop";

// Auth Wrapper
const ProtectedRoute = ({ children }) => {
  const user = JSON.parse(localStorage.getItem("user"));
  return user ? children : <Navigate to="/register" />;
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <ScrollToTop>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/product" element={<Products />} />
            <Route path="/product/:id" element={<Product />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route
              path="/checkout"
              element={
                <ProtectedRoute>
                  <Checkout />
                </ProtectedRoute>
              }
            />
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </ScrollToTop>
        <Toaster position="top-center" />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
