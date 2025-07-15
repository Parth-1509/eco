import React, { useEffect, useState } from "react";
import { Footer, Navbar } from "../components";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { clearCart } from "../redux/action";
import toast from "react-hot-toast";

const Checkout = () => {
  const state = useSelector((state) => state.handleCart);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [paymentMethod, setPaymentMethod] = useState("cod");

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) {
      navigate("/register");
    }
  }, [navigate]);

  const EmptyCart = () => (
    <div className="container">
      <div className="row">
        <div className="col-md-12 py-5 bg-light text-center">
          <h4 className="p-3 display-5">No item in Cart</h4>
          <Link to="/" className="btn btn-outline-dark mx-4">
            <i className="fa fa-arrow-left"></i> Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );

  const ShowCheckout = () => {
    let subtotal = 0;
    let shipping = 30.0;
    let totalItems = 0;
    state.forEach((item) => {
      subtotal += item.price * item.qty;
      totalItems += item.qty;
    });

    const handleOrder = () => {
      const requiredFields = [
        "firstName",
        "lastName",
        "email",
        "address",
        "country",
        "state",
        "zip",
      ];

      for (let id of requiredFields) {
        const el = document.getElementById(id);
        if (!el || !el.value.trim()) {
          el.classList.add("is-invalid");
          el.focus();
          return toast.error("⚠️ Please fill all required fields.");
        } else {
          el.classList.remove("is-invalid");
        }
      }

      // ZIP must be 6 digits
      const zip = document.getElementById("zip").value.trim();
      if (!/^\d{6}$/.test(zip)) {
        toast.error("⚠️ ZIP must be exactly 6 digits.");
        return;
      }

      // Email format check
      const email = document.getElementById("email").value.trim();
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        toast.error("⚠️ Invalid email format.");
        return;
      }

      if (paymentMethod === "card") {
        const cardFields = ["cc-name", "cc-number", "cc-expiration", "cc-cvv"];
        for (let id of cardFields) {
          const el = document.getElementById(id);
          if (!el || !el.value.trim()) {
            el.classList.add("is-invalid");
            el.focus();
            return toast.error("⚠️ Please fill all card details.");
          } else {
            el.classList.remove("is-invalid");
          }
        }

        // Card number validation: 16 digits
        const cardNumber = document.getElementById("cc-number").value.trim();
        if (!/^\d{16}$/.test(cardNumber)) {
          toast.error("⚠️ Card number must be exactly 16 digits.");
          return;
        }

        // CVV validation: 3 digits
        const cvv = document.getElementById("cc-cvv").value.trim();
        if (!/^\d{3}$/.test(cvv)) {
          toast.error("⚠️ CVV must be exactly 3 digits.");
          return;
        }

        // Expiry format: MM/YY
        const exp = document.getElementById("cc-expiration").value.trim();
        if (!/^\d{2}\/\d{2}$/.test(exp)) {
          toast.error("⚠️ Expiry must be in MM/YY format.");
          return;
        }
      }

      dispatch(clearCart());
      toast.success("✅ Order placed successfully!");
      navigate("/");
    };

    return (
      <div className="container py-5">
        <div className="row my-4">
          <div className="col-md-5 col-lg-4 order-md-last">
            <div className="card mb-4">
              <div className="card-header py-3 bg-light">
                <h5 className="mb-0">Order Summary</h5>
              </div>
              <div className="card-body">
  {state.map((item, index) => (
    <div
      key={index}
      className="d-flex align-items-center mb-3 border-bottom pb-2"
    >
      <img
        src={item.image}
        alt={item.title}
        style={{
          width: "60px",
          height: "60px",
          objectFit: "contain",
          marginRight: "10px",
          border: "1px solid #ddd",
          borderRadius: "5px",
        }}
      />
      <div className="flex-grow-1">
        <p className="mb-1">{item.title}</p>
        <p className="mb-0">
          Qty: {item.qty} | ₹{item.price * item.qty}
        </p>
      </div>
    </div>
  ))}

  <ul className="list-group list-group-flush mt-3">
    <li className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 pb-0">
      Products ({totalItems}) <span>₹{Math.round(subtotal)}</span>
    </li>
    <li className="list-group-item d-flex justify-content-between align-items-center px-0">
      Shipping <span>₹{shipping}</span>
    </li>
    <li className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 mb-0">
      <strong>Total</strong>
      <strong>₹{Math.round(subtotal + shipping)}</strong>
    </li>
  </ul>
</div>

            </div>
          </div>

          <div className="col-md-7 col-lg-8">
            <div className="card mb-4">
              <div className="card-header py-3">
                <h4 className="mb-0">Billing address</h4>
              </div>
              <div className="card-body">
                <form className="needs-validation" noValidate>
                  <div className="row g-3">
                    <div className="col-sm-6 my-1">
                      <label htmlFor="firstName" className="form-label">First name</label>
                      <input type="text" className="form-control" id="firstName" required />
                    </div>

                    <div className="col-sm-6 my-1">
                      <label htmlFor="lastName" className="form-label">Last name</label>
                      <input type="text" className="form-control" id="lastName" required />
                    </div>

                    <div className="col-12 my-1">
                      <label htmlFor="email" className="form-label">Email</label>
                      <input type="email" className="form-control" id="email" required />
                    </div>

                    <div className="col-12 my-1">
                      <label htmlFor="address" className="form-label">Address</label>
                      <input type="text" className="form-control" id="address" required />
                    </div>

                    <div className="col-12">
                      <label htmlFor="address2" className="form-label">
                        Address 2 <span className="text-muted">(Optional)</span>
                      </label>
                      <input type="text" className="form-control" id="address2" />
                    </div>

                    <div className="col-md-5 my-1">
                      <label htmlFor="country" className="form-label">Country</label>
                      <select className="form-select" id="country" required>
                        <option value="">Choose...</option>
                        <option>India</option>
                      </select>
                    </div>

                    <div className="col-md-4 my-1">
                      <label htmlFor="state" className="form-label">State</label>
                      <select className="form-select" id="state" required>
                        <option value="">Choose...</option>
                        <option>Gujarat</option>
                        <option>Maharashtra</option>
                        <option>Punjab</option>
                        <option>Uttar Pradesh</option>
                        <option>Delhi</option>
                        <option>Rajasthan</option>
                        <option>Karnataka</option>
                        <option>Tamil Nadu</option>
                        <option>West Bengal</option>
                      </select>
                    </div>

                    <div className="col-md-3 my-1">
                      <label htmlFor="zip" className="form-label">Zip</label>
                      <input
                        type="text"
                        className="form-control"
                        id="zip"
                        pattern="\d{6}"
                        title="Zip must be 6 digits"
                        required
                      />
                    </div>
                  </div>

                  <hr className="my-4" />

                  <h4 className="mb-3">Payment Method</h4>

                  <div className="form-check">
                    <input
                      type="radio"
                      id="cod"
                      name="paymentMethod"
                      value="cod"
                      className="form-check-input"
                      checked={paymentMethod === "cod"}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                    />
                    <label htmlFor="cod" className="form-check-label">Cash on Delivery</label>
                  </div>

                  <div className="form-check mb-3">
                    <input
                      type="radio"
                      id="card"
                      name="paymentMethod"
                      value="card"
                      className="form-check-input"
                      checked={paymentMethod === "card"}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                    />
                    <label htmlFor="card" className="form-check-label">Credit/Debit Card</label>
                  </div>

                  {paymentMethod === "card" && (
                    <div className="row gy-3">
                      <div className="col-md-6">
                        <label htmlFor="cc-name" className="form-label">Name on card</label>
                        <input type="text" className="form-control" id="cc-name" required />
                      </div>

                      <div className="col-md-6">
                        <label htmlFor="cc-number" className="form-label">Card number</label>
                        <input
                          type="text"
                          className="form-control"
                          id="cc-number"
                          pattern="\d{16}"
                          title="16-digit card number"
                          required
                        />
                      </div>

                      <div className="col-md-3">
                        <label htmlFor="cc-expiration" className="form-label">Expiration</label>
                        <input
                          type="text"
                          className="form-control"
                          id="cc-expiration"
                          placeholder="MM/YY"
                          pattern="\d{2}/\d{2}"
                          title="Format MM/YY"
                          required
                        />
                      </div>

                      <div className="col-md-3">
                        <label htmlFor="cc-cvv" className="form-label">CVV</label>
                        <input
                          type="text"
                          className="form-control"
                          id="cc-cvv"
                          pattern="\d{3}"
                          title="3-digit CVV"
                          required
                        />
                      </div>
                    </div>
                  )}

                  <hr className="my-4" />
                  <button className="w-100 btn btn-primary" type="button" onClick={handleOrder}>
                    Place Order
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      <Navbar />
      <div className="container my-3 py-3">
        <h1 className="text-center">Checkout</h1>
        <hr />
        {state.length ? <ShowCheckout /> : <EmptyCart />}
      </div>
      <Footer />
    </>
  );
};

export default Checkout;
