import React, { useEffect, useState, useRef } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Navbar = () => {
  const state = useSelector((state) => state.handleCart);
  const [user, setUser] = useState(null);
  const [showUserInfo, setShowUserInfo] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const dropdownRef = useRef();

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser && storedUser.name) {
      setUser(storedUser);
    }
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowUserInfo(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    setShowUserInfo(false);
    navigate("/login");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light py-3 sticky-top">
      <div className="container">
        <NavLink className="navbar-brand fw-bold fs-4 px-2" to="/">
          React Ecommerce
        </NavLink>
        <button
          className="navbar-toggler mx-2"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav m-auto my-2 text-center">
            <li className="nav-item">
              <NavLink
                className={({ isActive }) => `nav-link ${isActive ? "active-link" : ""}`}
                to="/"
              >
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                className={({ isActive }) => `nav-link ${isActive ? "active-link" : ""}`}
                to="/product"
              >
                Products
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                className={({ isActive }) => `nav-link ${isActive ? "active-link" : ""}`}
                to="/about"
              >
                About
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                className={({ isActive }) => `nav-link ${isActive ? "active-link" : ""}`}
                to="/contact"
              >
                Contact
              </NavLink>
            </li>
          </ul>

          <div className="buttons text-center" style={{ position: "relative" }}>
            {user ? (
              <>
                <button
                  className="btn btn-outline-dark m-2"
                  onClick={() => setShowUserInfo((prev) => !prev)}
                >
                  Hello, {user.name}
                </button>
                {showUserInfo && (
                  <div
                    ref={dropdownRef}
                    style={{
                      position: "absolute",
                      top: "55px",
                      right: "120px",
                      background: "white",
                      border: "1px solid #ddd",
                      borderRadius: "5px",
                      padding: "15px",
                      width: "260px",
                      boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
                      zIndex: 9999,
                      textAlign: "left",
                    }}
                  >
                    <p><strong>Name:</strong> {user.name}</p>
                    <p><strong>Email:</strong> {user.email}</p>
                    <p>
                      <strong>Password:</strong>{" "}
                      {showPassword ? user.password : ""}
                      <button
                        onClick={() => setShowPassword(!showPassword)}
                        style={{
                          background: "none",
                          border: "none",
                          cursor: "pointer",
                          marginLeft: "10px",
                        }}
                        aria-label={showPassword ? "Hide password" : "Show password"}
                      >
                        <i
                          className={`fa fa-eye${showPassword ? "-slash" : ""}`}
                          aria-hidden="true"
                        ></i>
                      </button>
                    </p>
                    <button
                      className="btn btn-sm btn-outline-danger w-100"
                      onClick={handleLogout}
                    >
                      Logout
                    </button>
                  </div>
                )}
              </>
            ) : (
              <>
                <NavLink
                  to="/login"
                  className={({ isActive }) =>
                    `btn m-2 liquid-button ${isActive ? "active-link" : ""}`
                  }
                >
                  <i className="fa fa-sign-in-alt mr-1"></i> Login
                </NavLink>
                <NavLink
                  to="/register"
                  className={({ isActive }) =>
                    `btn m-2 liquid-button ${isActive ? "active-link" : ""}`
                  }
                >
                  <i className="fa fa-user-plus mr-1"></i> Register
                </NavLink>
              </>
            )}
            <NavLink
              to="/cart"
              className={({ isActive }) =>
                `btn m-2 liquid-button ${isActive ? "active-link" : ""}`
              }
            >
              <i className="fa fa-cart-shopping mr-1"></i> Cart ({state.length})
            </NavLink>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
