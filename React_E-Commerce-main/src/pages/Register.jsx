import React, { useState } from "react";
import { Footer, Navbar } from "../components";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const Register = () => {
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const validate = () => {
    const newErrors = {};
    if (formData.name.trim().length < 3) {
      newErrors.name = "Username must be at least 3 characters";
    }
    if (!formData.email.includes("@") || !formData.email.includes(".")) {
      newErrors.email = "Please enter a valid email";
    }
    if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    const payload = {
      username: formData.name,
      email: formData.email,
      password: formData.password
    };

    try {
      const res = await fetch(`${process.env.REACT_APP_BACKEND_URL || "http://localhost:5000"}/api/users/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
      });

      const data = await res.json();

      if (res.ok) {
        toast.success("🎉 Registration successful!");
        navigate("/login");
      } else {
        toast.error(data.message || "Registration failed.");
      }
    } catch (err) {
      toast.error("❌ Network error or server not running.");
      console.error("Registration error:", err);
    }
  };

  return (
    <>
      <Navbar />
      <div className="container my-3 py-3">
        <h1 className="text-center">Register</h1>
        <hr />
        <div className="row my-4 h-100">
          <div className="col-md-4 col-lg-4 col-sm-8 mx-auto">
            <form onSubmit={handleSubmit}>
              <div className="form my-3">
                <label htmlFor="name">Full Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  placeholder="Enter Your Name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
                {errors.name && <small className="text-danger">{errors.name}</small>}
              </div>
              <div className="form my-3">
                <label htmlFor="email">Email address</label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  placeholder="name@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
                {errors.email && <small className="text-danger">{errors.email}</small>}
              </div>
              <div className="form my-3">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
                {errors.password && <small className="text-danger">{errors.password}</small>}
              </div>
              <div className="my-3">
                <p>
                  Already have an account?{" "}
                  <Link to="/login" className="text-decoration-underline text-info">
                    Login
                  </Link>
                </p>
              </div>
              <div className="text-center">
                <button className="my-2 mx-auto btn btn-dark" type="submit">
                  Register
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Register;
